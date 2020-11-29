'use strict';
const date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.User, {foreignKey : "userId", targetKey : "id"})
    }
  };
  ToDo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type : DataTypes.STRING,
      validate : {
        isDate : true,
        isAfter : '2020-11-29'
      }
    },
    userId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};