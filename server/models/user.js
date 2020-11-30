'use strict';
const { generatePassword } = require('../helpers/password')
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
      type: DataTypes.STRING,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len: [5]
      }
    }
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        instance.password = generatePassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};