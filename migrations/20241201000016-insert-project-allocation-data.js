'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project_allocation', [
      {
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        allocation_percentage: 100
      },
      {
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        allocation_percentage: 80
      },
      {
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-11-30'),
        allocation_percentage: 100
      },
      {
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-11-30'),
        allocation_percentage: 60
      },
      {
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-10-31'),
        allocation_percentage: 40
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_allocation', null, {});
  }
};
