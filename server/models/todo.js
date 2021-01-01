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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg:"Todo's name can't be empty"
        }
      },
    },
    description: DataTypes.STRING,
    due: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isAfter:{
          args: new Date().toString(),
          msg:'Due Date must be greater than Today'
        }
      }
    },
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks:{
      beforeCreate(instance, option){
        if(instance.status === ''){
          instance.status = 'Listed'
        }
        if(instance.category === ''){
          instance.category = 'Personal'
        }
      },
      beforeUpdate(instance, option){
        if(instance.status === ''){
          instance.status = 'Listed'
        }
        if(instance.category === ''){
          instance.category = 'Personal'
        }
      },
    },
  });

  return Todo;
};