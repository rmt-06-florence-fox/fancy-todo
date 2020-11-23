'use strict';
const {
  Model
} = require('sequelize');

const { hashing } = require("../helper/hashing_compare")

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
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashing(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};