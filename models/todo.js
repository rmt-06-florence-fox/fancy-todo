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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: { msg: 'title cannot be empty'},
        notEmpty: { msg: 'title cannot be empty'}
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate:{
        isIn:{
          args: [['done','not done']],
          msg:'insert status correctly'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        isAfter: {args: new Date().toString() , msg: 'due date must be greater than today'},
        notNull: { msg: 'date cannot be empty'},
        notEmpty: { msg: 'date cannot be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'Todo'
  });
  return Todo;
};