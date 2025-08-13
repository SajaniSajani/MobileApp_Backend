'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('releases', [
      {
        release_id: 'REL001',
        release_name: 'v1.0.0',
        releasedate: new Date('2024-06-01'),
        status: 1
      },
      {
        release_id: 'REL002',
        release_name: 'v1.1.0',
        releasedate: new Date('2024-07-01'),
        status: 1
      },
      {
        release_id: 'REL003',
        release_name: 'v2.0.0',
        releasedate: new Date('2024-08-01'),
        status: 0
      },
      {
        release_id: 'REL004',
        release_name: 'v1.0.1',
        releasedate: new Date('2024-06-15'),
        status: 1
      },
      {
        release_id: 'REL005',
        release_name: 'v1.2.0',
        releasedate: new Date('2024-07-15'),
        status: 0
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('releases', null, {});
  }
};
