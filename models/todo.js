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
      this.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title required'
        },
        notEmpty: {
          msg: `Title can not be empty`
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${new Date().getFullYear().toString()}-${new Date().getMonth().toString()}-${new Date().getDate().toString()}`,
          msg: 'Date must be after today'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};