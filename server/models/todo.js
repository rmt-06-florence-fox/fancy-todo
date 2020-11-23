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
          msg: "Title should not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description should not be empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Status should not be empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date should not be empty!"
        },
        isAfterDate(value){
          if (value){
            let dateNow = new Date()
            let year = dateNow.getFullYear()
            let month = dateNow.getMonth()
            let date = dateNow.getDate()

            if(value.getFullYear() < year){
              throw new Error("Date should be greater than recent date!")
            }
            else {
              if (value.getMonth() < month){
                throw new Error("Date should be greater than recent date!")
              }
              else {
                if (value.getDate() < date){
                  throw new Error("Date should be greater than recent date!")
                }
              }
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};