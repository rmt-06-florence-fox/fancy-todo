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
      validate: {
        notEmpty: {
          args: true,
          msg: `Title must not be empty !`
        },
        notNull: {
          args: true,
          msg: `Title must not be empty !`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Description must not be empty !`
        },
        notNull: {
          args: true,
          msg: `Description must not be empty !`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Status must not be empty !`
        },
        notNull: {
          args: true,
          msg: `Status must not be empty !`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: `Date must not be empty !`
        },
        isDate: true,
        isAfter: {
          args: new Date().toString(),
          msg: `Due date must not be prior from today !`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
  hooks: {
    beforeCreate(todo, options) {
      todo.status = 'incomplete'
    }
  },
    sequelize,
    modelName: 'Todo',
  });
  
  return Todo;
};