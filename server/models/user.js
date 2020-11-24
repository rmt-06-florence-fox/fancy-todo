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
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { message: `Can't be empty username` }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { args: [{ message: `Email must be filled with email format` }] }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 12, { message: 'Password must be greater than 6 and less than 12' }]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  })

  User.addHook('beforeCreate', (user) => {
    user.password = hashPwd(user.password)
  })

  return User
};