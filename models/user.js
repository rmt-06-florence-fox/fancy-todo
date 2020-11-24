'use strict';
const {hash} = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
const { options } = require('../routes');
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
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {
    let hashed = hash(instance.password)
    instance.password = hashed
  })
  return User;
};