'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoList.belongsTo(models.User)
    }
  };
  TodoList.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Can't be empty`
        },
        notEmpty: {
          msg: `Can't be empty`
        }
      }
    },
    desrcription: DataTypes.STRING,
    status: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: `Can't be empty`
        },
        notEmpty: {
          msg: `Can't be empty`
        }
      },
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Date only'
        }, 
        notNull: {
          msg: `Can't be empty`
        },
        notEmpty: {
          msg: `Can't be empty`
        },
        checkDate (value) {
          const now  = new Date ()
          if (value < now) {
              throw new Error ('Date must be greater than now')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};