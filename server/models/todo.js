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
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Title must be filled"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Description must be filled'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:"Deadline must be set"
        },
        isToday(value){
          
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance,option) => {
    instance.status = false
  })
  return Todo;
};