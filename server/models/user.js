'use strict';
const { hashPass } = require("../helper/generatePass")

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
      User.hasMany(models.Todo, {
        foreignKey: "UserId",
        sourceKey: "id"
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Email must be unique"
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        // const salt = bcrypt.genSaltSync(8)
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};