'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('release_test_case', [
      {
        release_test_case_id: 'RTC001',
        test_case_status: 'PASS',
        test_date: new Date('2024-06-01'),
        test_time: '10:00:00',
        description: 'User login test case executed successfully'
      },
      {
        release_test_case_id: 'RTC002',
        test_case_status: 'PASS',
        test_date: new Date('2024-06-01'),
        test_time: '11:00:00',
        description: 'User registration test case executed successfully'
      },
      {
        release_test_case_id: 'RTC003',
        test_case_status: 'PASS',
        test_date: new Date('2024-06-02'),
        test_time: '14:00:00',
        description: 'Project creation test case executed successfully'
      },
      {
        release_test_case_id: 'RTC004',
        test_case_status: 'FAIL',
        test_date: new Date('2024-06-02'),
        test_time: '15:00:00',
        description: 'Bug report test case failed due to validation error'
      },
      {
        release_test_case_id: 'RTC005',
        test_case_status: 'NEW',
        test_date: null,
        test_time: null,
        description: 'Test case creation test case not yet executed'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('release_test_case', null, {});
  }
};
