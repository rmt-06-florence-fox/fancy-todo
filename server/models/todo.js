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
    tittle: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type:DataTypes.DATEONLY,
      validate:{
        // isAfter: {
        //   args: new Date().toISOString().split('T')[0],
        //   msg: "the date must be greater than today"
        // }
        isGreaterThan(value){
          if(this.updatedAt.toISOString().split('T')[0] > this.due_date){ 
            throw new Error('the date must be greater than today')
          }
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