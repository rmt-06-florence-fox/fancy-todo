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
      Todo.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Title is required!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Description is required!`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Status is required!`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Due Date is Required!`
        },
        isDate:{
          msg: `Due date must be a format YYYY-MM-DD`
        },
        validate(value) {
          const now = new Date()
          if (value < now) {
            throw new Error (`Due date must not exceed today`)
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