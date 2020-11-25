'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ToDos', "userId", {
      type : Sequelize.INTEGER,
      references : {
        model : {
          tableName : "Users",
        },
        key : "id"
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ToDos', "userId")
  }
};
