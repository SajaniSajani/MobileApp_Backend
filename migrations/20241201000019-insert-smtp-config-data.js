'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('smtp_config', [
      {
        name: 'Gmail SMTP',
        smtp_host: 'smtp.gmail.com',
        smtp_port: 587,
        username: 'noreply@company.com',
        password: 'encrypted_password_here',
        from_email: 'noreply@company.com',
        from_name: 'Defect Tracker System'
      },
      {
        name: 'Outlook SMTP',
        smtp_host: 'smtp.outlook.com',
        smtp_port: 587,
        username: 'support@company.com',
        password: 'encrypted_password_here',
        from_email: 'support@company.com',
        from_name: 'Support Team'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('smtp_config', null, {});
  }
};
