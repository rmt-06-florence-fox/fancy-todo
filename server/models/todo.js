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
      Todo.belongsTo(models.User)
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be blank'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: ' description cannot be blank'
        }
      }
    },
    status: DataTypes.STRING,
     
    due_date:  {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toDateString(),
          msg: 'Deadline can not be less than today'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance,options)=>{
    instance.status = "still on progress"
   
    
  })

  // Todo.beforeUpdate((instance,options)=>{
  //   const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
  //   if (arr_dateInput < arr_today){
  //     return `Deadline can not be less than today date`
  //   }
  // })
  return Todo;
};