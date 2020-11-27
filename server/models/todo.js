'use strict';
const {
  Model
} = require('sequelize');
const _ = require('lodash');
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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        // isIn: [['true', 'false']]
        isBoolean: function (val) {
          if (!_.isBoolean(val)) {
            throw new Error('Status must boolean.');
          }
        }
      }
    },
    due_date: {
      type:DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: {
          args: new Date().toISOString().split('T')[0],
          msg: `Date must be greater than today`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance, opt) => {
    if (instance.title.trim() == '') {
      instance.title = 'Untitled'
    }
    if (instance.description.trim() == '') {
      instance.description = 'Untitled'
    }
    instance.status = false
  })

  return Todo;
};