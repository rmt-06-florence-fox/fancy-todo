'use strict';
const PassHelper = require('../helper/passwordHelper')
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
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate:(user, options)=>{
        user.password = PassHelper.passConverter(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};