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
      allowNull: false,
      validate:{
        notNull: { msg: 'title cannot be empty'},
        notEmpty: { msg: 'title cannot be empty'}
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        isAfter: {args: new Date().toString() , msg: 'due date must be greater than today'}
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};