'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword}=require('../helpers')
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg:"Name can't be empty"
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{
          args: true,
          msg:"Email can't be empty"
        },
        isEmail:{
          args: true,
          msg: 'Invalid email '
        },
      },
      unique:{
        msg:"Plase Choose another Email"
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg:"Please Enter Password"
        }
      },
    },
  }, {
    hooks:{
      beforeCreate:(instance, option)=>{
        instance.password= hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};