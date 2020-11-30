'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      this.belongsTo(models.User);
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
          msg: "Due date is required."
        },
        notEmpty: {
          args: true,
          msg: "Due date is required."
        },
        isAfter: {
          args: (new Date).toString(),
          msg: "Due date must be greater than today."
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance, options) => {
    instance.status = "uncompleted";
  })

  return Todo;
};