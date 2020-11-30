'use strict';
const Helper = require('../helper/')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo)
    }
  };
  
  User.init({
    fullName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      unique : true, 
      validate : {
        isEmail : {
          msg : 'please enter the correct email format'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args: [6, 100],
          msg : 'password length must be more than 5'
        } 
      }
    }
  }, {
    hooks : {
      beforeCreate : (user, option) => {
        user.password = Helper.hashingPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};