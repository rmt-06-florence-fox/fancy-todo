'use strict';
const {
  Model
} = require('sequelize');
const Bcrypt = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here]
      User.hasMany(models.ToDo, {foreignKey : "userId", sourceKey : "id"})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          message : "Please input your email"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : {
          args : [6],
          message : "Minimum 6 character"
        }
      }
    }
  }, {
    hooks : {
      beforeCreate: (instance, option) => {
        instance.password = Bcrypt.hashSync(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};