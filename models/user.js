'use strict';
const Helper = require('../helper/')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      unique : true, 
      valdate : {
        isEmail : {
          msg : 'please enter the correct email format'
        },
        notEmpty : {
          msg : 'email cannot be empty'
        }
      }
    },
    password: DataTypes.STRING
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