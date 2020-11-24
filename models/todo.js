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
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty:true,
        // isIn: [['true', 'false']]
        isBoolean: function (val) {
          if (!_.isBoolean(val)) {
            throw new Error('Not boolean.');
          }
        }
      }
    },
    due_date: {
      type:DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString().split('T')[0]
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