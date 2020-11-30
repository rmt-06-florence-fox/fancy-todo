'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
      Todo.belongsTo(models.User)
    }
    
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        customValidator(value) {
          if(value == null || value.length === 0) {
            throw new Error('Please enter date')
          } else {
            const dateNow = new Date().getTime()
            const valueDate = value.getTime()
            if(valueDate < dateNow) {
              throw new Error('Due date is invalid')
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance, option) => {
    if(instance.status == null) {
      instance.status = false
    } 
  })
  return Todo;
};