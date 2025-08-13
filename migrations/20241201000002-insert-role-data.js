'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', [
      {
        role_name: 'Admin'
      },
      {
        role_name: 'Manager'
      },
      {
        role_name: 'Developer'
      },
      {
        role_name: 'Tester'
      },
      {
        role_name: 'User'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
  }
};
