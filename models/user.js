'use strict';
var bcrypt = require('bcryptjs')
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
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `first_name is required`
        }
      }
    },
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options)=>{
    var salt = bcrypt.genSaltSync(8)
    console.log(instance.password)
    instance.password = bcrypt.hashSync(instance.password, salt)
    console.log(instance.password)

  })
  return User;
};