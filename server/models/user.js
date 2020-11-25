'use strict';
const bcrypt = require('../helpers')
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
      this.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'input must be email format'
        }
      }
    },
    password: DataTypes.STRING
  }, {  
    hooks: {
      beforeCreate: (user, err) => {
        user.password = bcrypt.hashPassword(user.password);
      } 
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};