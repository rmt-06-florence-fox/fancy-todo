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
        notEmpty: {
          msg: "Title should not be empty"
        },
        notNull: {
          msg: "Title should not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description should not be empty"
        },
        notNull: {
          msg: "Description should not be empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Status should not be empty"
        },
        notNull: {
          msg: "Status should not be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date should not be empty!"
        },
        notNull: {
          msg: "Date should not be empty"
        },
        isAfterDate(value){
          if (value){
            let dateNow = new Date().toISOString()
            if (dateNow.split("T")[0] > value){
              throw new Error("Date should be greater than today")
            }
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