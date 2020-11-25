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
      Todo.belongsTo(models.User , {foreignKey : "UserId", targetKey : "id"})
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Please enter the title of your activitt'
        }
      }
    },
    description: DataTypes.STRING,
    due_date: {
      type : DataTypes.DATEONLY,
      validate : {
        isAfterDate(value) {
          console.log('=========================Get The Value================')
          console.log(new Date(value) , new Date())
          console.log(new Date(value) < new Date())
          if(new Date(value) < new Date () ){
            throw new Error('Due_date must be at future date')
          }

        }
      }
    },
    status: DataTypes.STRING,
    UserId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate( (instance, option ) =>{
    console.log('============== Masuk Hook TOdo========')
    console.log(instance)
    if(instance.status == undefined || instance.status == '' ){
      instance.status = 'Ongoing'
    }
  } )

  return Todo;
};