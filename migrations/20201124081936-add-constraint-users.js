'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      fields: ['username'],
      type: 'unique',
      name: 'constraint_unique_username'
    })
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'constraint_unique_email'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users', 'constraint_unique_username', {})
    await queryInterface.removeConstraint('Users', 'constraint_unique_email', {})
  }
};
