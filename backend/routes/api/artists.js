const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const router = express.Router();

const { Playlist, Song, User, Album, sequelize } = require('../../db/models');

//GET artist by ID
router.get('/:artistId', async (req, res, next)=>{
    const userId = req.params.artistId
    const artist = await User.findByPk(userId, {
                  // attributes:['id','username', 'imageUrl'],
                  include: [{
                    model: Song,
                    where:{userId: userId},
                    attributes:[]
                  },{
                    model: Album,
                    where:{userId: userId},
                    attributes:[]
                  }
                ],
                  attributes:[
                      'id','username',
                      [sequelize.fn('COUNT', sequelize.col('Songs.userId')), 'totalSongs'],
                      [sequelize.fn('COUNT', sequelize.col('Albums.userId')), 'totalAlbums'],
                      'imageUrl',
                    ],
                    group: ['User.id']


    })

    res.json(artist)

})
//GET all songs of an artist by ID
router.get('/:artistId/songs', async (req, res, next)=>{
  const artist = await User.findByPk(req.params.artistId)
  console.log(artist)
  if(!artist){
    res.statusCode = 404
    res.json(  {
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  }
    const songs = await Song.findAll({where:{userId: req.params.artistId}})
    res.json({Songs: songs})
})

//GET all playlist by artistId
router.get('/:artistId/playlists', async(req, res, next)=>{
  const playlist = await Playlist.findAll({where:{userId: req.params.artistId}})
  res.json(playlist)
})

module.exports = router;
