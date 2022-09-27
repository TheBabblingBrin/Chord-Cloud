const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album, Playlist, PlaylistSong } = require('../../db/models');

//CREATE playlist
router.post('/', requireAuth, async(req, res, next)=>{
  const {name, imageUrl} = req.body
  const userId = req.user.id
  const newPL = await Playlist.create({name, imageUrl, userId})
  res.json(newPL)
})

//ADD song to playlist by Id
router.post('/:playlistId/songs', requireAuth, async (req, res, next)=>{
  const playlistId = parseInt(req.params.playlistId)
  const {songId} = req.body
  const addSong = await PlaylistSong.create({playlistId: playlistId, songId: songId})
  res.json(addSong)
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
module.exports = router;
