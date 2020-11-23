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
        notEmpty: {
          args: true,
          msg: 'Cannot be blank'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance,options)=>{
    const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    let arr_today = today.split("-")
    let dateInput = instance.due_date
    let arr_dateInput = dateInput.split("-")

    if (arr_dateInput[0] < arr_today [0]){
      return `Deadline can not be less than today date`
    }
    
  })

  Todo.beforeUpdate((instance,options)=>{
    const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    if (arr_dateInput < arr_today){
      return `Deadline can not be less than today date`
    }
  })
  return Todo;
};