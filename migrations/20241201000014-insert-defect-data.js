'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('defect', [
      {
        defect_id: 'DEF001',
        description: 'Login button not responding when clicked',
        steps: '1. Navigate to login page 2. Click login button 3. Button does not respond',
        re_open_count: 0,
        attachment: null,
        assigned_by: 1,
        assigned_to: 2,
        defect_status_id: 1,
        type_id: 1,
        modules_id: 1,
        priority_id: 1,
        project_id: 1,
        severity_id: 1
      },
      {
        defect_id: 'DEF002',
        description: 'User registration email validation not working properly',
        steps: '1. Fill registration form 2. Enter invalid email 3. Form accepts invalid email',
        re_open_count: 1,
        attachment: null,
        assigned_by: 1,
        assigned_to: 3,
        defect_status_id: 2,
        type_id: 2,
        modules_id: 1,
        priority_id: 2,
        project_id: 1,
        severity_id: 2
      },
      {
        defect_id: 'DEF003',
        description: 'Project creation form shows error when creating new project',
        steps: '1. Navigate to project creation 2. Fill required fields 3. Submit form 4. Error appears',
        re_open_count: 0,
        attachment: null,
        assigned_by: 2,
        assigned_to: 1,
        defect_status_id: 1,
        type_id: 1,
        modules_id: 2,
        priority_id: 1,
        project_id: 2,
        severity_id: 1
      },
      {
        defect_id: 'DEF004',
        description: 'Test case search functionality is broken',
        steps: '1. Go to test case module 2. Enter search term 3. Search returns no results',
        re_open_count: 2,
        attachment: null,
        assigned_by: 2,
        assigned_to: 4,
        defect_status_id: 3,
        type_id: 3,
        modules_id: 2,
        priority_id: 3,
        project_id: 2,
        severity_id: 3
      },
      {
        defect_id: 'DEF005',
        description: 'Need bulk import functionality for test cases',
        steps: '1. Navigate to test case module 2. Look for bulk import option 3. Option not available',
        re_open_count: 0,
        attachment: null,
        assigned_by: 1,
        assigned_to: 2,
        defect_status_id: 1,
        type_id: 1,
        modules_id: 1,
        priority_id: 1,
        project_id: 1,
        severity_id: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('defect', null, {});
  }
};
