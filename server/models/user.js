"use strict";
const { hash } = require("../helpers/bcryptHelpers");
const { Model } = require("sequelize");
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
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (instance, options) => {
    let hashed = hash(instance.password);
    instance.password = hashed;
  });

  return User;
};
