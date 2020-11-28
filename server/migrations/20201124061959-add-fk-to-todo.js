'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.addColumn('Todos', 'UserId', { 
      type: Sequelize.INTEGER,
      references: { 
        model: {
          tableName: 'Users',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.removeColumn('Todos', 'UserId', {});
  }
};
