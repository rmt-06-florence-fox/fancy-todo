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
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'your full name cannot be empty'
        }
      }
    },
    userName: {
      type: DataTypes.STRING,
      unique: {
        msg: 'someone else has used this user name'
      },
      validate: {
        notEmpty: {
          msg: 'user name cannot be empty'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      unique: {
        msg: 'someone else has registered this email'
      }, 
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