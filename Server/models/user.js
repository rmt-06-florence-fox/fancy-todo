'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../Helper/helper')
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
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Username can't be empty`
        }
      }
    },
    email:{
      type: DataTypes.STRING,
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
    password:{
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
    hooks:{
      beforeCreate(instance, options){
        const hash = Helper.hashPassword(instance.password)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};