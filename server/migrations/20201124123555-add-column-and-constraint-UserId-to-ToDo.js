'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('ToDos', 'UserId', Sequelize.INTEGER)
   await queryInterface.addConstraint('ToDos', {
     fields: ['UserId'],
     type: 'foreign key',
     name: 'UserId-constraint',
     references: { //Required field
       table: 'Users',
       field: 'id'
     },
     onDelete: 'cascade',
     onUpdate: 'cascade'
   })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ToDos', 'UserId-constraint')
    await queryInterface.removeColumn('ToDos', 'UserId')
  }
};
