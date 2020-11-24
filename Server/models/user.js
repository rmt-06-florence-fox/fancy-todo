'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../Helper/helper')
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
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance, options){
        const hash = Helper.hashPassword(instance.password)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};