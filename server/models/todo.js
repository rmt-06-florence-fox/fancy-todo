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
          msg: 'Masukkan Title!!'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Masukkan Due Date!!'
        },
        validateDate(value) {
          if (new Date(value) <= new Date()) {
            throw new Error ('Due Date must greater than today!!')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance, option) => {
    instance.status = 'pending'
  })

  return Todo;
};