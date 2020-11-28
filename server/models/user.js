'use strict';
const {enPassword} = require('../helpers/bcrypt')
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
      type:DataTypes.STRING,
      allowNull:false,
      unique: {
        msg: 'email must be unique'
      },
      validate:{
        notEmpty: {msg: 'email cannot be empty'},
        isEmail: {msg: 'please input correct email'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {msg: 'input password correctly'},
        morethan6(value){
          if(value.length < 6){
            throw new Error('password min. 6 characters');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user,options){
        user.password = enPassword(user.password)
      }
    }
  });
  return User;
};