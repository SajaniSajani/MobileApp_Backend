'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('priority', [
      {
        priority: 'Low',
        color: '#28a745'
      },
      {
        priority: 'Medium',
        color: '#ffc107'
      },
      {
        priority: 'High',
        color: '#fd7e14'
      },
      {
        priority: 'Critical',
        color: '#dc3545'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('priority', null, {});
  }
};
