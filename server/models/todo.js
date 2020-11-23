'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY,
    // UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  // Todo.beforeCreate()
  return Todo;
};