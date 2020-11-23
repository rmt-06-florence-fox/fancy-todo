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
      Todo.belongsTo(models.User)
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
          let now = new Date
          now = now.toISOString().split('T')[0]
          value =  value.toISOString().split('T')[0]
          if(value <= now)
            throw new Error('Date must be greater than today')
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