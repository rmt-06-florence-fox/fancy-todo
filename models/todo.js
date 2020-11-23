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
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isGreaterThan(value) {
          if (this.due_date < this.updatedAt.toISOString().split('T')[0]) {
            throw new Error('Due Date harus lebih dari sama dengan tanggal membuat Todo')
          }
        }
      }
    },
    due_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};