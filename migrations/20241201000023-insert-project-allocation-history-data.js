'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project_allocation_history', [
      {
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-31'),
        percentage: 100,
        status: 1
      },
      {
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-02-28'),
        percentage: 80,
        status: 1
      },
      {
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-03-31'),
        percentage: 100,
        status: 1
      },
      {
        start_date: new Date('2024-04-01'),
        end_date: new Date('2024-04-30'),
        percentage: 60,
        status: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_allocation_history', null, {});
  }
};
