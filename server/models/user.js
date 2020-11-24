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
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Email Required`
        },
        notNull: {
          msg: `Email Required`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Password Required`
        },
        notNull: {
          msg: `Password Required`
        }
      }
    }
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