'use strict';
const {encrypt} = require('../helpers/crypt')

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
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"email must be filled"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[8],
          msg:"password must be at least 8 character"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance,option) =>{
    instance.password = encrypt(instance.password)
  })

  return User;
};