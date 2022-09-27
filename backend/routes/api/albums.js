const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album } = require('../../db/models');

//Get all albums
router.get('/', async (req, res, next) =>{
  const albums = await Album.findAll()
  res.json({Albums: albums})
})

//Get all albums by current user
router.get('/current', requireAuth, async (req, res, next) =>{
  const user = req.user.id
  const albums = await Album.findAll({
    where:{
      userId: user
    }
  })
  res.json({Albums: albums})
})

//Albums by Artist ID
router.get('/artist/:artistId/songs', async (req, res, next) =>{
  const albums = await Album.findAll({
    where:{
      userId: req.params.artistId
    }
  })

  res.json({Albums: albums})
})

//Get album by ID
router.get('/:albumId', async (req, res, next) =>{
  const album = await Album.findByPk(req.params.albumId, {
    include:[{
      model: User,
      attributes: ['id','username','imageUrl']
    },{
      model: Song
    }
  ]
  })
  res.json(album)
})

//Create Album
router.post('/', requireAuth, async (req, res, next) =>{
  const {title, description, imageUrl} = req.body
  const userId = req.user.id
  const album = await Album.create({userId, title, description, imageUrl})
  res.json(album)
})

router.put('/:albumId', requireAuth, async (req, res, next) =>{
  const {title, description, imageUrl} = req.body
  const album = await Album.findByPk(req.params.albumId)
  await album.update({title, description, imageUrl})
  res.json(album)
} )

//DELETE Album by ID
router.delete('/:albumId', requireAuth, async (req, res, next)=>{
  const albumId = req.params.albumId
  const album = await Album.findByPk(albumId)
  if(album){
    album.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })} else{
    res.statusCode = 404
    res.json({
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }
})
module.exports = router;
