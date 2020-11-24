'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'title cannot be empty'
          }
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'description cannot be empty'
          }
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'status cannot be empty'
          }
        }
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
          notEmpty: {
            msg: 'due date cannot be empty'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Todos');
  }
};