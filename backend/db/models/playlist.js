'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Playlist.belongsTo(models.User, {foreignKey: 'userId'})
        Playlist.belongsToMany(models.Song, {through: 'PlaylistSongs', foreignKey: 'playlistId', otherKey: 'songId', onDelete: 'CASCADE'} )
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
