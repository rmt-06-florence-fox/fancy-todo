'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatename(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your title!!')
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        validatename(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your description!!')
          }
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatename(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your status!!')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        validateDate(value) {
          if (value === null || value === '') {
            throw new Error ('Please enter your due date!!')
          } else if (new Date(value) <= new Date()) {
            throw new Error ('Due Date must greater than today!!')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};