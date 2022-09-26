const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album, Comment } = require('../../db/models');

//All songs
router.get('/', async (req, res, next) =>{
  const songs = await Song.findAll({
    include:{
      model: User
    }
  })
  res.json({Songs: songs})
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

module.exports = router;
