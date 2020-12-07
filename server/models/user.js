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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email is already used"
      },
      validate: {
        notEmpty : {
          args: true,
          msg: "email is required"
        },
        isEmail: {
          args: true,
          msg: "input must be a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: "password is required"
        }
      }
    }
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