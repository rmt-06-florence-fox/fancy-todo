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
      Todo.belongsTo(models.User, {
        foreignKey: "UserId",
        targetKey: "id"
      })
    }
  };
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Tittle can't be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Description can't be empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Status can't be empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Date can't vbe empty"
        },
        dateValidation(value) {
          const day = new Date().toISOString().split("T")[0]
          if (value < day) {
            throw new Error("The date cannot be later than today")
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