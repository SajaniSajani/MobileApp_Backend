'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('defect_status', [
      {
        defect_status_name: 'Open',
        color_code: '#007bff'
      },
      {
        defect_status_name: 'In Progress',
        color_code: '#ffc107'
      },
      {
        defect_status_name: 'Fixed',
        color_code: '#28a745'
      },
      {
        defect_status_name: 'Closed',
        color_code: '#6c757d'
      },
      {
        defect_status_name: 'Reopened',
        color_code: '#dc3545'
      },
      {
        defect_status_name: 'Reject',
        color_code: '#dc3545'
      },
      {
        defect_status_name: 'Duplicate',
        color_code: '#6c757d'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('defect_status', null, {});
  }
};
