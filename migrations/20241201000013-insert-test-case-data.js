'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('test_case', [
      {
        test_case_id: 'TC001',
        description: 'Verify user can login with valid credentials',
        steps: '1. Enter valid username 2. Enter valid password 3. Click login button'
      },
      {
        test_case_id: 'TC002',
        description: 'Verify new user can register successfully',
        steps: '1. Fill registration form 2. Submit form 3. Verify confirmation'
      },
      {
        test_case_id: 'TC003',
        description: 'Verify project can be created with valid data',
        steps: '1. Fill project details 2. Submit form 3. Verify project created'
      },
      {
        test_case_id: 'TC004',
        description: 'Verify bug can be reported with required fields',
        steps: '1. Fill bug report form 2. Submit report 3. Verify bug created'
      },
      {
        test_case_id: 'TC005',
        description: 'Verify test case can be created successfully',
        steps: '1. Fill test case form 2. Submit form 3. Verify test case created'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('test_case', null, {});
  }
};
