'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'field title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'field description is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        args: true,
        msg: 'field status is required'
      }
    },
    due_date: {
      type: DataTypes.DATE,
      dateValidate(currentDate) {
        if (currentDate < new Date()) throw new Error ('Date must be greater than today')
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};