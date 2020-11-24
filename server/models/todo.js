'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title is required."
        },
        notEmpty: {
          args: true,
          msg: "Title is required."
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Date is required."
        },
        notEmpty: {
          args: true,
          msg: "Date is required."
        },
        isAfter: {
          args: (new Date).toString(),
          msg: "Date must be greater than today."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance, options) => {
    instance.status = "uncompleted";
  })

  return Todo;
};