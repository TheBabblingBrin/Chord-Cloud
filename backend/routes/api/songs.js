const express = require('express')
const { setTokenCookie, restoreUser, requireAuth, isOwner} = require('../../utils/auth');

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
      model: User
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

//Songs by Artist ID
router.get('/artist/:artistId/songs', async (req, res, next) =>{
  const songs = await Song.findAll({
    where:{
      userId: req.params.artistId
    }
  })

  res.json({Songs: songs})
})

//GET song by ID
router.get('/:songId', async (req, res, next) =>{
  const song = await Song.findByPk(req.params.songId, {
    include:[{
      model: User
    },
    {
      model: Album
    }]
  })
  res.json(song)
})

//Edit a song by id
router.put('/:songId', requireAuth, async (req, res, next) =>{
  const {title, description, url, imageUrl, albumId} = req.body
  const userId = req.user.id

  const song = await Song.findByPk(req.params.songId)
  await song.update({title, description, url, imageUrl, albumId, userId})
  res.json(song)
} )

//Create song w or w/o album id
router.post('/', async (req, res, next) =>{
  const {title, description, url, imageUrl, albumId} = req.body
  const userId = req.user.id
  const song = await Song.create({userId,title, description, url, imageUrl, albumId})
  res.json(song)
})
////COMMENTS

//CREATE a comment based on songId
router.post('/:songId/comments', requireAuth, async (req, res, next) =>{
  const {body} = req.body
  const songId = parseInt(req.params.songId)
  const userId = req.user.id
  const comment = await Comment.create({userId,songId,body})
  res.json(comment)

})

//GET comments by songID
router.get('/:songId/comments', async (req, res, next) =>{
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
  if(song.id != userId) isOwner(res);
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
