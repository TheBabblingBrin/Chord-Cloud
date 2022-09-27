const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const router = express.Router();

const { Song, User, Album, sequelize } = require('../../db/models');

//GET artist by ID
router.get('/:artistId', async (req, res, next)=>{
    const userId = req.params.artistId
    const artist = await User.findByPk(userId, {
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
                  attributes:{
                    include:[
                      [sequelize.fn('COUNT', sequelize.col('Songs.userId')), 'totalSongs'],
                      [sequelize.fn('COUNT', sequelize.col('Albums.userId')), 'totalAlbums']
                    ]
                  }
    })

    res.json(artist)

})

// attributes: [[sequelize.fn('COUNT', sequelize.col('Song.userId')), 'totalSongs']]

module.exports = router;
