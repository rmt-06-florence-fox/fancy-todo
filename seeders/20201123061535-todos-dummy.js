'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ToDos', [{
        title: 'Bake a cake',
        description: 'Bake a cake for grandma birthday',
        status: 'pending',
        due_date: '2020-11-25',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        title: 'Buy flowers',
        description: 'Buy a bouquet of daisys for grandma birthday',
        status: 'pending',
        due_date: '2020-11-25',
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ToDos', null, {})
  }
};