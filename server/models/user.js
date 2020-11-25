'use strict';
const { getHash } = require ('../helpers/helper')

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
      User.hasMany(models.TodoList)
    }
  };
  User.init({    
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: `Email can't be empty`
      }
    }
   },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: `Email must use correct format`
        },
        notEmpty: {
          msg: `Email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args:true,
          msg: `Password Can't be empty`
        },
        notEmpty: {
          msg: `Password Can't be empty`
        },
        minSixLong (value) {
          if (value.length < 6) {
            throw new Error (`Password must be longer than 5 character`)
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = getHash (instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};