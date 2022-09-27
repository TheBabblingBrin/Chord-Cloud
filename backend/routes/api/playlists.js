const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

const router = express.Router();

const { Song, User, Album, Playlist } = require('../../db/models');

//CREATE playlist
router.post('/', requireAuth, async(req, res, next)=>{
  const {name, imageUrl} = req.body
  const userId = req.user.id
  const newPL = await Playlist.create({name, imageUrl, userId})
  res.json(newPL)
})



module.exports = router;
