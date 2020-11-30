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
      type: DataTypes.BOOLEAN,
    },
    due_date: {
      type: DataTypes.DATE,
    },
    UserId: DataTypes.INTEGER }, {
     sequelize,
    modelName: 'Todo',
  });

  Todo.addHook('beforeCreate', instance => {
    instance.status = false
  })

  return Todo;
};