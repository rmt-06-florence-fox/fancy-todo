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
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `status is required`
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `status is required`
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `status is required`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: new Date().toISOString().slice(0,10)
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};