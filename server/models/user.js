"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      email: { 
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        }
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
