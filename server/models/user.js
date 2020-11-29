'use strict';
const bcrypt = require ('bcryptjs')
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
      User.hasMany(models.Todo, {
        foreignKey: 'UserId',
        sourceKey : 'id'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : { 
        args: true, 
        msg: "Email already exists" },
      validate : {
        notEmpty: {
          args:true,
          msg: 'Email is Required'
        }, isEmail: {
          args:true,
          msg: 'Email is not Valid'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : { 
        args: true, 
        msg: "Email already exists" },
      validate : {
        notEmpty: {
          args:true,
          msg: 'Username is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          args:true,
          msg: 'Password is required'
        },
        min : 6
      }
    }
  }, {
    hooks: {
      beforeCreate: (dataUser, option) => {
        let salt = bcrypt.genSaltSync(4)
        dataUser.password = bcrypt.hashSync(dataUser.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};