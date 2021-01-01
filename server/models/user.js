'use strict';
const bcrypt = require("bcryptjs")
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name should not be empty"
        },
        notNull: {
          msg: "First name should not be empty"
        }
      }
    },
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username should not be empty"
        },
        notNull: {
          msg: "Username should not be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email should not be empty"
        },
        notNull: {
          msg: "Email should not be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password should not be empty"
        },
        notNull: {
          msg: "Password should not be empty"
        },
        lengthPassword(value){
          if(value.length < 6){
            throw new Error ("Password length should be more than 5 characters")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user) => {
    if(!user.last_name){
      user.last_name = user.first_name
    }
    let salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });
   
  return User;
};