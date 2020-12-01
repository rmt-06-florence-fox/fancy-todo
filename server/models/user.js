'use strict';
const { hashing } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Your name, please?`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: `is this the correct email?`
        },
        notEmpty: {
          msg: `With Email you can do anything`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: `Try to create password more than 8 character`
        },
        notEmpty: {
          msg: `Ohh, your password is empty`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (dataUser, opt) => {
        dataUser.password = hashing(dataUser.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};