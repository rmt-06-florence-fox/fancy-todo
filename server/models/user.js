'use strict';
const { hashPwd } = require('../helpers/password')

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
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user,opt) => {
        user.password = hashPwd(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};