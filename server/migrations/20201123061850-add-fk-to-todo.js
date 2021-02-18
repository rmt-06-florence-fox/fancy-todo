'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Todos", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        key: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Todos", "UserId", Sequelize.INTEGER)
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
