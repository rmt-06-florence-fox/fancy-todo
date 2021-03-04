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
      type: DataTypes.BOOLEAN
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: `due date can't be empty`
        },
        notNull: {
          args: true,
          msg: `due date can't be empty`
        },
        isDate: {
          args: true,
          msg: `must be in date format`
        },
        gtToday(value) {
          const now = new Date()
          if (now >= value) {
            throw new Error('due date should be greater than today bro')
          }
        }
      }
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