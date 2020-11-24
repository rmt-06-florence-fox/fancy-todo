'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: `title cannot be blank`
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: `description cannot be blank`
      },
    },
    status: {
      type: DataTypes.STRING
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: 'due date must be greater than today'
        }
      },
    },
    // UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.addHook('beforeCreate', (ini) => {
    if (!ini.status) {
      ini.status = 'Pending'
    }
    // if (!due_date) {
    //   ini.due_date = new Date()
    // }
  })
  2
  return Todo;
};