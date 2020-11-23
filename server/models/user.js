'use strict';
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
      User.hasMany(models.TodoList)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args:true,
          msg: 'Password tidak boleh kosong'
        },
        notEmpty: {
          msg: `Password tidak boleh kosong`
        },
        minSixLong (value) {
          if (value.length < 6) {
            throw new Error ('Password minimal 6 karakter')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};