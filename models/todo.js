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
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            args: true,
            msg: `Please use date format MM/DD/YYYY!`,
          },
          isAfter: {
            args: new Date().toDateString(),
            msg: `Due Date can be filled with date after today.`,
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
