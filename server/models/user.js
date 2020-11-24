'use strict';
const { hashing } = require('../helpers/hashing-comparing')
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
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (dataUser, opt) => {
        dataUser.password = hashing(dataUser.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};