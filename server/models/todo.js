'use strict';
const moment = require('moment');
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
      this.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
        }
      }
    },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'description cannot be empty'
          }
        }
      },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status cannot be empty'
        },
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { 
        notEmpty: {
          args: true,
          msg: "due_date cannot be empty"
        },
        validateDateNow(date){
          if(date && date < new Date().toISOString().substr(0, 10)){
            throw {message: 'date at least today'}  
          }
          // console.log(date.toLocaleDateString(), new Date().toLocaleDateString())
      }
    }
  },
    UserId: DataTypes.INTEGER   
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};