'use strict';
const Bcrypt = require('../helper/bcrypt')
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
      User.hasMany(models.Todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    name: {type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: `name must be fill`
            },
            isFill(value){
              if (!value || value == '' || value.trim() == '') {
                throw new Error(`name must be fill`);
              }
            }
          }},
    email: {type : DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: `email must be fill`
            },
            isFill(value){
              if (!value || value == '' || value.trim() == '') {
                throw new Error(`email must be fill`);
              }
            },
            isEmail: {
              msg: "format email not true"
            }
          }},
    password: {type: DataTypes.STRING,
            validate: {
              passwordValidate(value){
                if (value.length < 5) {
                  throw new Error(`length of password min 5`);
                }
              },
              min: 5
            }}
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = Bcrypt.hash(instance.password)
  })
  User.beforeUpdate((instance, option) => {
    instance.password = Bcrypt.hash(instance.password)
  })
  return User;
};