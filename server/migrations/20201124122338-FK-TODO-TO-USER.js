'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'Users'
        }
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return queryInterface.removeColumn('Todos', 'UserId');
  }
};
