'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.hasMany(models.Song, {foreignKey: 'albumId'})
      Album.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Album.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
