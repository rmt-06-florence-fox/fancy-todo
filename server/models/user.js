'use strict';
const {
  Model
} = require('sequelize');
const Password = require('../helpers/hash-password')
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
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, opt) => {
    const hashed = Password.hashPassword(instance.password)
    instance.password = hashed
  })
  return User;

};