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
        emptyTitle(value) {
          if (value === '') {
            throw new Error('title empty');
          }
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        emptyDescription(value) {
          if (value === '') {
            throw new Error('description empty');
          }
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        emptyStatus(value) {
          if (value === '') {
            throw new Error('status empty');
          }
        },
      },
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        emptyDate(value) {
          if (value === '') {
            throw new Error('date empty');
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};