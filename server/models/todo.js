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
          notEmpty: {
            msg: 'title cannot be empty'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'description cannot be empty'
          }
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'status cannot be empty'
          }
        }
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'due date cannot be empty'
          },
          isNone(value) {
            let dateObj = new Date();
            let month = dateObj.getMonth() + 1; //months from 1-12 di tambah 1 karena selalu berkurang 1
            let day = dateObj.getDate();
            let year = dateObj.getFullYear()
            // console.log(value.getMonth()+1)
            if(value.getMonth()+1 < month){
              throw new Error('date must be greater than now')
            }
            if(value.getDate() < day){
              throw new Error('date must be greater than now')
            }
            if(value.getFullYear() < year){
              throw new Error('date must be greater than now')
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