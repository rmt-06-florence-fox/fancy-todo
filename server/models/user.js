'use strict';
const {
  Model
} = require('sequelize');
const bycrypt = require('bcryptjs')
require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
    
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "First name cannot empty"
        }
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", (instance, option) => {
    if(instance.lastName === "") {
      instance.lastName = instance.firstName
    }
  })

  User.addHook("beforeUpdate", (instance, option) => {
    if(instance.lastName === "") {
      instance.lastName = instance.firstName //jangan lupa tambahin individual hooks
    }
  })

  User.addHook("beforeCreate", (instance, option) => {
    let hashedPass = bycrypt.hashSync(instance.password, +process.env.Hash)
    instance.password = hashedPass
  })

  return User;
};