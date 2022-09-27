const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album, Playlist, PlaylistSong } = require('../../db/models');
const { Op } = require('sequelize');
//CREATE playlist
router.post('/', requireAuth, async(req, res, next)=>{
  const {name, imageUrl} = req.body
  const userId = req.user.id
  const newPL = await Playlist.create({name, imageUrl, userId})
  res.json(newPL)
})

//ADD song to playlist by Id
router.post('/:playlistId/songs', requireAuth, async (req, res, next)=>{
  const plId = parseInt(req.params.playlistId)
  const {songId} = req.body
  const addSong = await PlaylistSong.create({playlistId: plId, songId: songId})
  const {id, playlistId} = addSong
  res.json({id, playlistId, songId})
})

//GET playlist of current user
router.get('/current', requireAuth, async (req, res, next) =>{
  const user = req.user.id
  const playlists = await Playlist.findAll({
    where:{
      userId: user
    }
  })
  res.json({Playlist: playlists})
})
//GET details of playlist by Id
router.get('/:playlistId', async (req, res, next)=>{
  const playlist = await Playlist.findByPk(req.params.playlistId, {
    include:{
      model: Song,
    }
  })
  res.json(playlist)
})
//Edit a playlist by id
router.put('/:playlistId', requireAuth, async (req, res, next)=>{
  const playlist = await Playlist.findByPk(req.params.playlistId)
  const {name, imageUrl} = req.body
  await playlist.update({name, imageUrl})
  res.json(playlist)
})

//DELETE a song from a playlist by id
router.delete('/:playlistId/songs/:songId', requireAuth, async (req, res, next)=>{
  const playlistId = req.params.playlistId
  const songId = req.params.songId
  const song = await PlaylistSong.findAll({
    where:{
      [Op.and]: [{songId: songId}, {playlistId: playlistId}]
    }
  })
  // res.json(playlistSong)})
  if(song[0]){
    await song[0].destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })} else{
    res.status = 404
    res.json({
      "message": "The specified song was not on this playlist",
      "statusCode": 404
    })
  }
})
//DELETE playlist by ID
router.delete('/:playlistId', requireAuth, async (req, res, next)=>{
  const playlistId = req.params.playlistId
  const playlist = await Playlist.findByPk(playlistId)
  // res.json(playlistSong)})
  if(playlist){
    playlist.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
  })} else{
    res.statusCode = 404
    res.json({
      "message": "Playlist couldn't be found",
      "statusCode": 404
    })
  }
})
module.exports = router;
