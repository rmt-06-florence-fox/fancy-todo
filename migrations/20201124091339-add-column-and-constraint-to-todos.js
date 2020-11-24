'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ToDos', 'UserId', Sequelize.INTEGER, {
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ToDos', 'UserId', {})
  }
};
