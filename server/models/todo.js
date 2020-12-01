'use strict';
const day = new Date();
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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: `Title must be filled`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: `Description must be filled`
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date(day.setDate(day.getDate() - 1)).toString(),
          msg: `Must be today or greater than today`
        },
        notEmpty: {
          msg: `Due Date must be filled`
        }
      }
    },
    UserId: DataTypes.INTEGER 
  }, {
    hooks:{
      beforeCreate(todo){
        todo.status = `On progress`
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};