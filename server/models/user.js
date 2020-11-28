'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helper/hash')
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
        notNull: {
          args: true,
          msg: 'Name Is Mandatory!'
        },
        notEmpty: {
          args: true,
          msg: 'Name Is Mandatory!'
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email Is Mandatory!'
        },
        notEmpty: {
          args: true,
          msg: 'Email Is Mandatory!'
        },
        isEmail: {
          args: true,
          msg: 'Please check again your email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Is Mandatory!!'
        },
        notEmpty: {
          args: true,
          msg: 'Password Is Mandatory!'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (instance, opt) => {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};