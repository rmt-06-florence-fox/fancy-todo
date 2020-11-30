'use strict';
const {
  Model
} = require('sequelize');
const {hasPassword} = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{
          args: true,
          msg: `Email is required!`
        },
        isEmail:{
          msg: `Email must be a format sample@mail.com`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Password is required!`
        },
        len:{
          args: [6],
          msg: `Password must be more than 6 character`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hasPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};