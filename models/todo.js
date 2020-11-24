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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['Sedang dikerjakan', 'Akan dikerjakan', 'Sudah dikerjakan']],
          msg: "Status must be 'Sedang dikerjakan' or 'Akan dikerjakan' or 'Sudah dikerjakan'"
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Use 'MM/DD/YYYY' Format"
        },
        isBesok(value){
          if(new Date(value) <= Date.now()){
            throw new Error('Date must be greater than now');
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