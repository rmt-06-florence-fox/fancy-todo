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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        isEmail: {
          msg: 'Email is not Valid'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true,
      validate : {
        notNull: {
          msg: 'Username is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (dataUser, option) => {
        let salt = bcrypt.genSaltSync(4)
        dataUser.password = bcrypt.hashSync(dataUser.password, salt)
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};