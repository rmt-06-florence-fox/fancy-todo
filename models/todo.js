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
    due_date: {
      type : DataTypes.DATEONLY,
      validate : {
        isAfterDate(value) {
          console.log('=========================Get The Value================')
          console.log(new Date(value) , new Date())
          console.log(new Date(value) < new Date())
          if(new Date(value) < new Date () ){
            throw new Error('Due_date harus lebih besar dari tanggal hari ini')
          }

        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};