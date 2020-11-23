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
    validate: {
      notEmpty: {
        args: true,
        msg: "The title is required"
      },
      notNull :{
        args: true,
        msg : "The title is required"
      }
    }},
    description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: {
        args: true,
        msg: "The description is required"
      },
      notNull: {
        args: true,
        msg: "The description is required"
      }
    }},
    status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "The status is required"
      },
      notNull:{
        args: true,
        msg: "The status is required"
      }
    }},
    due_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: "The date is required"
      },
      notNull: {
        args: true,
        msg: "The date is required"
      }
    }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};