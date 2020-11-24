'use strict';
const Helper = require('../helper')
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
      ToDo.belongsTo(models.User)
    }
  };
  ToDo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull: {
          msg: 'title cannot be null'
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'description cannot be null'
        },
        notEmpty : {
          msg : 'description cannot be empty'
        }
      }
      
    },
    status: DataTypes.STRING,
    due_date: {
      type : DataTypes.DATE,
      allowNull: false,
      validate : {
        isAfter : {
          args : Helper.getToday(),
          msg : 'the due date must be, at least, tommorow'
        },
        notNull: {
          msg: 'due date cannot be null'
        },
        notEmpty: {
          msg: 'due date cannot be empty'
        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate : (instance, option) => {
        if(!instance.status) instance.status = 'undone'
      }
    },
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};