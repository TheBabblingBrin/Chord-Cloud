'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, profileImg, email } = this; // context will be the User instance
      return { id, firstName, lastName, profileImg, username, email };
    };
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };
    static async signup({ username, firstName, lastName, email, profileImg, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        firstName,
        lastName,
        profileImg,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      User.hasMany(models.Album, {foreignKey: 'userId'})
      User.hasMany(models.Song, {foreignKey: 'userId'})
      User.hasMany(models.Playlist, {foreignKey: 'userId'})
      User.hasMany(models.Comment, {foreignKey: 'userId'})



    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName:{
        type: DataTypes.STRING
        // allowNull: false,
      },
      lastName:{
        type: DataTypes.STRING
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      profileImg:{
        type: DataTypes.STRING,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
