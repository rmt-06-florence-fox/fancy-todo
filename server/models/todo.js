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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      }
    },
    status: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        dateValidation(value){
          let currentDate = new Date()
          if(new Date(value) < currentDate){
            throw new Error(`tanggal tidak boleh diisi tanggal sebelumnya`)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance, option) => {
    instance.status =  "unfinished"
  })
  Todo.beforeUpdate((instance, option) => {
    console.log('tes')
    instance.status =  "unfinished"
  })
  return Todo;
};