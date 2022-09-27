const express = require('express')
const { setTokenCookie, restoreUser, requireAuth, isOwner} = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const validateSong = [
  check('title')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage("Song title is required"),
check('url')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage("Audio is required"),
handleValidationErrors
];
const validateComment = [
  check('body')
  .exists({ checkFalsy: true })
  .notEmpty()
  .withMessage("Comment body text is required"),
handleValidationErrors
]
const router = express.Router();

const { Song, User, Album, Comment } = require('../../db/models');

//All songs
router.get('/', async (req, res, next) =>{
  let errors = {}
  let { page, size , createdAt, title} = req.query
    page = parseInt(page)
    size = parseInt(size)
    Number.isInteger(page) ? null : page = 1;
    Number.isInteger(size) ? null : size = 20;

    page > 10?
      errors.page = "Page must be less than or equal to 10":null;
    page < 1?
      errors.page = "Page must be less than or equal to 1":null;

    size > 20?
      errors.size = "Size must be less than or equal to 10":null;
    size < 1?
      errors.size = "Size must be less than or equal to 1":null;


  createdAt && typeof createdAt !== 'string'? errors.createdAt = "CreatedAt is invalid":null;
  title && typeof title !== 'string'? errors.title = 'Title is invalid':null;
  if(Object.values(errors).length) {
    res.statusCode = 400
    res.json({
                "message": "Validation Error",
                "statusCode": 400,
                errors})
  }

  let pagination = {}
    pagination.limit = size
    pagination.offset = size * (page - 1)
  let where = {}
   createdAt? where.createdAt = createdAt:null;
   title? where.title = title:null;
  const songs = await Song.findAll({
    include:{
      model: User,
      attributes:['id', 'username', 'imageUrl']
    },
    where,
    ...pagination
  })
  res.json({Songs: songs, page, size})
})

//Songs by current user
router.get('/current', requireAuth, async (req, res, next) =>{
  const user = req.user.id
  const songs = await Song.findAll({
    where:{
      userId: user
    }
  })
  res.json({Songs: songs})
})

// //Songs by Artist ID
// router.get('/artist/:artistId/songs', async (req, res, next) =>{
//   const artist = await User.findByPk(req.params.artistId)
//   console.log(artist)
//   if(artist){
//     res.statusCode = 404
//     res.json(  {
//       "message": "Artist couldn't be found",
//       "statusCode": 404
//     })
//   }
//   const songs = await Song.findAll({
//     where:{
//       userId: req.params.artistId
//     }
//   })

//   res.json({Songs: songs})
// })

//GET song by ID
router.get('/:songId', async (req, res, next) =>{
  const song = await Song.findByPk(req.params.songId, {
    include:[{
      model: User,
      attributes:['id','username','imageUrl']
    },
    {
      model: Album,
      attributes:['id','title','imageUrl']

    }]
  })
  if(!song){
    res.statusCode = 404
    return res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  res.json(song)
})

//Edit a song by id
router.put('/:songId', validateSong, requireAuth, async (req, res, next) =>{
  const {title, description, url, imageUrl, albumId} = req.body
  const userId = req.user.id


  const song = await Song.findByPk(req.params.songId)
  if(!song){
    res.statusCode = 404
    return res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  if(isOwner(res, userId, song.userId)){
    return
  }
  await song.update({title, description, url, imageUrl, albumId, userId})
  res.json(song)
} )

//Create song w or w/o album id
router.post('/', validateSong, requireAuth, async (req, res, next) =>{
  const {title, description, url, imageUrl, albumId} = req.body
  const userId = req.user.id
  const album = await Album.findByPk(albumId)
  if(!album && albumId !== null) {
    res.statusCode = 404
    res.json(   {
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }
  const song = await Song.create({userId, albumId, title, description, url, imageUrl})
  res.statusCode = 201
  res.json(song)
})
////COMMENTS

//CREATE a comment based on songId
router.post('/:songId/comments', validateComment, requireAuth, async (req, res, next) =>{
  const {body} = req.body
  const song = await Song.findByPk(req.params.songId)
  if(!song){
    res.statusCode = 404
    return res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  const songId = parseInt(req.params.songId)
  const userId = req.user.id
  const comment = await Comment.create({userId,songId,body})
  res.json(comment)

})

//GET comments by songID
router.get('/:songId/comments', async (req, res, next) =>{
  const song = await Song.findByPk(req.params.songId)
  if(!song){
    res.statusCode = 404
    return res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  const comments = await Song.findByPk(req.params.songId, {
    attributes:[],
    include:{
      model: Comment,
      include:{
        model: User,
        attributes:['id','username']
      },
      where:{
        songId: req.params.songId
      }
    }
  })
  res.json(comments)
})

//DELETE Song by ID
router.delete('/:songId', requireAuth, async (req, res, next)=>{
  const userId = req.user.id
  const songId = req.params.songId
  const song = await Song.findByPk(songId)
  if(isOwner(res, userId, song.userId)){
    return
  }

  if(song){
    song.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })} else{
    res.statusCode = 404
    res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
})
module.exports = router;
