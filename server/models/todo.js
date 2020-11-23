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
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      // get: function(){
      //   return moment(this.getDataValue('DateTime')).format('DD.MM.YYYY')
      // },
      validate: {
      validateDateNow(date){
        if(date.toLocaleDateString() < new Date().toLocaleDateString()){
          throw(new Error('invalid date'))  
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