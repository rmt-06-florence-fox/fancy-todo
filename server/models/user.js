'use strict';
const {hashPassword} = require('../helper/encryption.js')

const {
  Model
} = require('sequelize');
const { options } = require('../routes/index.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo , {foreignKey : "UserId", sourceKey: "id"})
      // define association here
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'please insert your name'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          msg : 'please insert your email'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'please insert your password'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate( (instance,options) =>{
    console.log('============Hook Before Create================')
    console.log(instance)

    instance.password = hashPassword(instance.password)
  })
  return User;
};