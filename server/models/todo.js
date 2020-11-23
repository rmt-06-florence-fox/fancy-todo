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
        notEmpty: { msg: `Title can't be empty` }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        emptyDesc(desc) {
          if (!desc) throw new Error(`Description can't be empty`)
        }
      }
    },
    status: DataTypes.STRING,
    dueDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: { args: new Date().toString(), msg: 'Due date must be greater than today' }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.addHook('beforeCreate', (todo) => {
    if (!todo.status) todo.status = 'Pending'
  })

  return Todo;
};