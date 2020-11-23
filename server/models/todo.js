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
      Todo.belongsTo(models.User, {foreignKey: "UserId", targetKey: "id"})
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `The title must not null`
        },
        notEmpty : {
          msg : `The title must not empty`
        }
      } 
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `The description must not null`
        },
        notEmpty : {
          msg : `The description must not empty`
        }
      } 
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        isTheDay(value){
          if(new Date(value) < new Date()){
            throw new Error(`Date must be grather than today`)
          }
        },
        notNull : {
          msg : `The date must not null`
        },
        notEmpty : {
          msg : `The date must not empty`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate : (inst, opt) =>{
        inst.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};