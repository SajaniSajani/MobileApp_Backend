'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modules', [
      {
        module_id: 'UM001',
        module_name: 'User Management'
      },
      {
        module_id: 'PM001',
        module_name: 'Project Management'
      },
      {
        module_id: 'DT001',
        module_name: 'Defect Tracking'
      },
      {
        module_id: 'TCM001',
        module_name: 'Test Case Management'
      },
      {
        module_id: 'RM001',
        module_name: 'Release Management'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', null, {});
  }
};
