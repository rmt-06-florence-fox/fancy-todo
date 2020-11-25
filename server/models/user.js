'use strict';

const { hash, compare } = require('../helpers/bcrypt-pass')
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatename(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your name!!')
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatename(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your email!!')
          }
        },
        isEmail: {
          args: true,
          msg: 'Format email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatename(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your password!!')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {
    instance.password = hash(instance.password)
  })

  return User;
};