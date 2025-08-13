'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bench', [
      {
        bench_id: 'BENCH001',
        allocated: 0,
        availability: 100
      },
      {
        bench_id: 'BENCH002',
        allocated: 0,
        availability: 100
      },
      {
        bench_id: 'BENCH003',
        allocated: 0,
        availability: 100
      },
      {
        bench_id: 'BENCH004',
        allocated: 0,
        availability: 100
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bench', null, {});
  }
};
