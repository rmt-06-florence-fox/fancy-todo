'use strict';
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
      User.hasMany(models.todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Require valid Email address !`
        },
        isEmail: {
          msg: `Email must be in valid email format !`
        }
      }
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Password can not be empty !`
          },
          len: {
            args: [8],
            msg: `Password must contain at least 8 characters !`
          }
        }
      }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const hash = helper.hashPassword(instance.password)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};