'use strict';
// const bcrypt = require('bcryptjs')
const {encodePassword} = require('../helpers/bcrypt')
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
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Email must not be empty'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email must not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email must be an email formatted'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Password must not be empty'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        },
        len: {
          args: [6, 32],
          msg: 'Password character length min 6'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (userData, opt) => {
        userData.password = encodePassword(userData.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};