'use strict';
const Helper = require('../helpers/helper.js')
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
      User.hasMany(models.Todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email must not be empty !`
        },
        notNull: {
          args: true,
          msg: `Email must not be empty !`
        },
        isEmail: {
          args: true,
          msg: `Email must be in valid email format !`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password must not be empty !`
        },
        notNull: {
          args: true,
          msg: `Password must not be empty !`
        },
        len: {
          args: [5],
          msg: `Password must contain at least 5 characters !`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        Helper.createPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};