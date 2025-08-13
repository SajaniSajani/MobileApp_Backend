'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('severity', [
      {
        severity_name: 'Low',
        severity_color: '#28a745',
        weight: 1
      },
      {
        severity_name: 'Medium',
        severity_color: '#ffc107',
        weight: 2
      },
      {
        severity_name: 'High',
        severity_color: '#fd7e14',
        weight: 3
      },
      {
        severity_name: 'Critical',
        severity_color: '#dc3545',
        weight: 4
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('severity', null, {});
  }
};
