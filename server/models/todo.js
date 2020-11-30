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
        notNull: {
          args: true,
          msg: 'Title Cannot Be Empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Title Cannot Be Empty!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description Cannot Be Empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Description Cannot Be Empty!'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isAfter: {
          args: new Date().toString(),
          msg: 'Due Date must be greater than today!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance, opt) => {
    instance.status = false
  })

  return Todo;
};