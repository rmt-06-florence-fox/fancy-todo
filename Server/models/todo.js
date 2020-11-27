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
    title:
    {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty:{
          args: true,
          msg: `Title can't be empty !`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:{
          args: true,
          msg: `Description can't be empty`
        }
      }
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:{
          args: true,
          msg: `Status can't be empty`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: `Due Date can't be empty`
        },
        // isAfter:{        //ini kurang tepat karena new Date()nya itu tergantung server (?) 
        //   args: new Date().toISOString().split('T')[0],
        //   msg: 'Date must be greater than today'
        // }
        isGreaterThan(value){
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