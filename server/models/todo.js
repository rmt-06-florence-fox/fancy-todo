"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: `title cannot be blank`,
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: `description cannot be blank`,
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          //gabisa pake isAfter, jadi bikin function validate sendiri
          compareDate(date) {
            if (new Date().toISOString().split("T")[0] >= this.due_date) {
              throw new Error("date must be greater than today");
            }
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  Todo.addHook("beforeCreate", (ini) => {
    if (!ini.status) {
      ini.status = "Pending";
    }
    // if (!due_date) {
    //   ini.due_date = new Date()
    // }
  });
  return Todo;
};
