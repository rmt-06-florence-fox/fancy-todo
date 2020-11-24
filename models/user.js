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
      User.hasMany(models.ToDo, { foreignKey: "UserId", sourceKey: "id" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, option) {
        let salt = bcrypt.genSaltSync(8)
        instance.password = bcrypt.hashSync(instance.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};