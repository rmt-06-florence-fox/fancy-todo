'use strict';
const bcrypt = require('bcryptjs')
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
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (userData, options) =>{
        var salt = bcrypt.genSaltSync(8)
        userData.password = bcrypt.hashSync(userData.password, salt)
      }
    },
    sequelize,
    modelName: 'User'
  });
  // tipe 3 ditasnya return
  // User.beforeCreate((instance, options) =>{
  //   instance.password = bcrypt.hashSync(instance.password, salt) // salt => enkrip
  // })
  return User;
};