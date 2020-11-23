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
    title: {type: DataTypes.STRING,
            validate: {
              notEmpty: {
                msg: `title must be fill`
              },
              isFill(value){
                if (!value || value == '' || value.trim() == '') {
                  throw new Error(`title must be fill`);
                }
              }
            }},
    description: {type: DataTypes.STRING,
              validate: {
                notEmpty: {
                  msg: `description must be fill`
                },
                isFill(value){
                  if (!value || value == '' || value.trim() == '') {
                    throw new Error(`description must be fill`);
                  }
                }
              }},
    status: {type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `status must be fill`
        },
        isFill(value){
          if (!value || value == '' || value.trim() == '') {
            throw new Error(`status must be fill`);
          }
        }
      }},
    due_date: {type: DataTypes.DATEONLY, 
              validate: {
                validDate(value){
                  if (new Date().toISOString().split('T')[0] > value) {
                    throw new Error(`date invalid`)
                  }
                }
              }}
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};