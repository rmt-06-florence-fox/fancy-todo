'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "format email is required"
        },
        notEmpty: {
          args: true,
          msg: 'Field email is required'
        }
      },
      unique: {
        msg: 'Email is already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 20],
          msg: 'password required 4 - 20 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Field password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.addHook('beforeCreate', instance => {
    instance.password = hashPassword(instance.password)
  })
  
  return User;
};