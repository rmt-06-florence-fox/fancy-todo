'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes');
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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: new Date().toString()
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.status = 'uncomplete'
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};