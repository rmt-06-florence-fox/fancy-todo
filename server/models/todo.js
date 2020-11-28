'use strict';
const {
  Model
} = require('sequelize');

const date = new Date();

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {

    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date(date.setDate(date.getDate() - 1)).toString(),
          message: "Due date cannot be in the past time!"
        },
        notEmpty: {
          message: "You have to set Due Date!"
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