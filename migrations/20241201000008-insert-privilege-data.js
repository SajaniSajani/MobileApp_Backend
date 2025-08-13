'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('privilege', [
      {
        privilege_name: 'Create'
      },
      {
        privilege_name: 'Read'
      },
      {
        privilege_name: 'Update'
      },
      {
        privilege_name: 'Delete'
      },
      {
        privilege_name: 'Admin'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('privilege', null, {});
  }
};
