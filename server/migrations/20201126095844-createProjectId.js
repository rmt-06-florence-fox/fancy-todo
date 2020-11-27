'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'ProjectId', {
      type : Sequelize.INTEGER,
      references : {
        model : 'Projects',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'ProjectId',Sequelize.INTEGER)
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
