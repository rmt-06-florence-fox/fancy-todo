'use strict';
// const bcrypt = require('bcryptjs')
const {encodePassword} = require('../helpers/bcrypt')
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
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Password character length min 6'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (userData, opt) => {
        userData.password = encodePassword(userdata.password)
        // const salt = bcrypt.genSaltSync(8)
        // userData.password = bcrypt.hashSync(userData.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};