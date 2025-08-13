'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // This table only has an id field, so we'll just insert basic records
    // The foreign key relationships are commented out in the model
    await queryInterface.bulkInsert('group_privilege', [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('group_privilege', null, {});
  }
};
