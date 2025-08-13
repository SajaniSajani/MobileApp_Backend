'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('defect_history', [
      {
        defect_ref_id: 'DEF001',
        defect_status: 'In Progress',
        previous_status: 'Open',
        assigned_by: 'John Doe',
        assigned_to: 'Jane Smith',
        defect_date: new Date('2024-06-01'),
        defect_time: '10:00:00',
        release_id: 1,
        record_status: 'Active'
      },
      {
        defect_ref_id: 'DEF001',
        defect_status: 'Fixed',
        previous_status: 'In Progress',
        assigned_by: 'Jane Smith',
        assigned_to: 'Mike Wilson',
        defect_date: new Date('2024-06-02'),
        defect_time: '15:30:00',
        release_id: 1,
        record_status: 'Active'
      },
      {
        defect_ref_id: 'DEF002',
        defect_status: 'Reassigned',
        previous_status: 'Open',
        assigned_by: 'Sarah Jones',
        assigned_to: 'John Doe',
        defect_date: new Date('2024-06-03'),
        defect_time: '09:15:00',
        release_id: 2,
        record_status: 'Active'
      },
      {
        defect_ref_id: 'DEF003',
        defect_status: 'Priority Changed',
        previous_status: 'Medium',
        assigned_by: 'Mike Wilson',
        assigned_to: 'Mike Wilson',
        defect_date: new Date('2024-06-04'),
        defect_time: '14:20:00',
        release_id: 2,
        record_status: 'Active'
      },
      {
        defect_ref_id: 'DEF004',
        defect_status: 'Fixed',
        previous_status: 'Open',
        assigned_by: 'John Doe',
        assigned_to: 'John Doe',
        defect_date: new Date('2024-06-05'),
        defect_time: '11:45:00',
        release_id: 3,
        record_status: 'Active'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('defect_history', null, {});
  }
};
