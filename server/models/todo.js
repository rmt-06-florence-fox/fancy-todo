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
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric:{
          msg: 'Only allow alphanumeric'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toDateString(),
          msg: 'Date must be greater than today'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(instance, options){
        instance.status = 'uncomplete'
      }
    }
  });
  return Todo;
};