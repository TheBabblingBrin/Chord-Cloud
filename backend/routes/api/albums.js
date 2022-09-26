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
    include:{
      model: Song
    }
  })
  res.json(album)
})

//Create Album
router.post('/', async (req, res, next) =>{
  const {title, description, imageUrl} = req.body
  const userId = req.user.id
  const album = await Album.create({title, description, imageUrl, userId})
  res.json(album)
})

router.put('/:albumId', requireAuth, async (req, res, next) =>{
  const {title, description, imageUrl} = req.body
  const album = await Album.findByPk(req.params.albumId)
  await album.update({title, description, imageUrl})
  res.json(album)
} )
module.exports = router;
