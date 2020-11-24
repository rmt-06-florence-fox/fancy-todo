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
    title:
    {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        // isAfter:{        //ini kurang tepat karena new Date()nya itu tergantung server (?) 
        //   args: new Date().toISOString().split('T')[0],
        //   msg: 'Date must be greater than today'
        // }
        isGreaterThan(value){
          // if(this.updatedAt.toISOString().split('T')[0] >= this.due_date) throw new Error('Date must be greater than today')
          if(new Date().toISOString().split('T')[0] >= this.due_date) throw new Error('Date must be greater than today')
        },
        notNull: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      // allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};