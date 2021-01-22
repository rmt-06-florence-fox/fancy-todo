'use strict';
const {
  Model
} = require('sequelize');
const {
  options
} = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.User)
    }
  };
  ToDo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Date input cannot be empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ToDo',
  });

  ToDo.beforeCreate((instance, options) => {
    const dateToday = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    if (instance.due_date < dateToday) {
      throw new Error(`Can't input date before today!`)
    }
  })

  ToDo.beforeBulkUpdate((instance, options) => {
    const dateToday = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    if (instance.attributes.due_date < dateToday) {
      throw new Error(`Can't input date before today!`)
    }
    // console.log(instance);
  })
  return ToDo;
};