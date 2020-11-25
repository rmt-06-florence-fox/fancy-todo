'use strict';
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
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'input correct email'
        }
      },
      unique: {
        args: true,
        msg: 'This email is already exits'
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};