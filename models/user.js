'use strict';
let bcrypt = require('bcryptjs')
const {hashPassword} = require('../helpers/bcrypt')
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
    hooks: {
      beforeCreate: (userData, opt) => {
        userData.password = hashPassword(userData.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};