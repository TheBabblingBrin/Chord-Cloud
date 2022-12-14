'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.Playlist, {through: 'PlaylistSongs', foreignKey: 'songId', otherKey: 'playlistId'})
      Song.hasMany(models.Comment, {foreignKey: 'songId', onDelete: 'CASCADE'})
      Song.belongsTo(models.Album, {foreignKey: 'albumId', onDelete: 'set null', hooks:true})
      Song.belongsTo(models.User, {foreignKey: 'userId'})

    }
  }
  Song.init({
    albumId:DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
