"use strict";
const { Model } = require("sequelize");
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
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          isTitleEmpty(value) {
            if (value == "") {
              throw new Error("Title Required");
            }
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          isDescEmpty(value) {
            if (value == "") {
              throw new Error("Description Required");
            }
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isStatusEmpty(value) {
            if (value == "") {
              throw new Error("Status Required");
            }
          },
        },
      },
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDateEmpty(value) {
            if (value == "") {
              throw new Error("Date Required");
            }
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
