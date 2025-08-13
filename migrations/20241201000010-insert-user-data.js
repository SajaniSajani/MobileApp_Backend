'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        user_id: 'ADMIN001',
        email: 'admin@company.com',
        password: 'hashed_password_here',
        first_name: 'System',
        last_name: 'Administrator',
        join_date: new Date('2024-01-01'),
        user_gender: 'Male',
        user_status: 'Active',
        phone_no: '+1234567890'
      },
      {
        user_id: 'USER001',
        email: 'john.doe@company.com',
        password: 'hashed_password_here',
        first_name: 'John',
        last_name: 'Doe',
        join_date: new Date('2024-01-15'),
        user_gender: 'Male',
        user_status: 'Active',
        phone_no: '+1234567891'
      },
      {
        user_id: 'USER002',
        email: 'jane.smith@company.com',
        password: 'hashed_password_here',
        first_name: 'Jane',
        last_name: 'Smith',
        join_date: new Date('2024-02-01'),
        user_gender: 'Female',
        user_status: 'Active',
        phone_no: '+1234567892'
      },
      {
        user_id: 'USER003',
        email: 'mike.wilson@company.com',
        password: 'hashed_password_here',
        first_name: 'Mike',
        last_name: 'Wilson',
        join_date: new Date('2024-02-15'),
        user_gender: 'Male',
        user_status: 'Active',
        phone_no: '+1234567893'
      },
      {
        user_id: 'USER004',
        email: 'sarah.jones@company.com',
        password: 'hashed_password_here',
        first_name: 'Sarah',
        last_name: 'Jones',
        join_date: new Date('2024-03-01'),
        user_gender: 'Female',
        user_status: 'Active',
        phone_no: '+1234567894'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
