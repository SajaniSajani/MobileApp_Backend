'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sub_module', [
      {
        sub_module_id: 'UM001-SM001',
        sub_module_name: 'User Registration'
      },
      {
        sub_module_id: 'UM001-SM002',
        sub_module_name: 'Role Management'
      },
      {
        sub_module_id: 'PM001-SM001',
        sub_module_name: 'Project Planning'
      },
      {
        sub_module_id: 'PM001-SM002',
        sub_module_name: 'Resource Allocation'
      },
      {
        sub_module_id: 'DT001-SM001',
        sub_module_name: 'Bug Reporting'
      },
      {
        sub_module_id: 'DT001-SM002',
        sub_module_name: 'Bug Resolution'
      },
      {
        sub_module_id: 'TCM001-SM001',
        sub_module_name: 'Test Planning'
      },
      {
        sub_module_id: 'TCM001-SM002',
        sub_module_name: 'Test Execution'
      },
      {
        sub_module_id: 'RM001-SM001',
        sub_module_name: 'Release Planning'
      },
      {
        sub_module_id: 'RM001-SM002',
        sub_module_name: 'Deployment'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sub_module', null, {});
  }
};
