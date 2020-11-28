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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isGreaterThan(value) {
          if (this.due_date < this.updatedAt.toISOString().split('T')[0]) {
            throw new Error('Date input minimum requirement is today and so on')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate : (instance, opt) => {
        if (!instance.status) {
          instance.status = "Not Done Yet"
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};