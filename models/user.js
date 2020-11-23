'use strict';
const {dePassword, enPassword} = require('../helpers/bcrypt')
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
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
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
          if(value.length <= 6){
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