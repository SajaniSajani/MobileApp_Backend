'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project', [
      {
        project_id: 'PROJ001',
        project_name: 'E-commerce Platform',
        client_name: 'TechCorp Inc',
        country: 'United States',
        state: 'California',
        description: 'Online shopping application with payment integration',
        email: 'contact@techcorp.com',
        phone_no: '+1-555-0123',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        project_status: 'ACTIVE',
        kloc: 150.5
      },
      {
        project_id: 'PROJ002',
        project_name: 'Mobile Banking App',
        client_name: 'BankSecure Ltd',
        country: 'United Kingdom',
        state: 'London',
        description: 'Cross-platform mobile banking application',
        email: 'info@banksecure.co.uk',
        phone_no: '+44-20-7946-0958',
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-11-30'),
        project_status: 'ACTIVE',
        kloc: 200.0
      },
      {
        project_id: 'PROJ003',
        project_name: 'HR Management System',
        client_name: 'GlobalHR Solutions',
        country: 'Canada',
        state: 'Ontario',
        description: 'Human resources management and payroll system',
        email: 'support@globalhr.ca',
        phone_no: '+1-416-555-0123',
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-10-31'),
        project_status: 'ON_HOLD',
        kloc: 120.0
      },
      {
        project_id: 'PROJ004',
        project_name: 'Inventory Management',
        client_name: 'Warehouse Pro',
        country: 'Australia',
        state: 'New South Wales',
        description: 'Warehouse and inventory tracking system',
        email: 'admin@warehousepro.com.au',
        phone_no: '+61-2-5550-1234',
        start_date: new Date('2024-04-01'),
        end_date: new Date('2024-09-30'),
        project_status: 'COMPLETED',
        kloc: 80.0
      },
      {
        project_id: 'PROJ005',
        project_name: 'Customer Support Portal',
        client_name: 'SupportMax',
        country: 'Germany',
        state: 'Bavaria',
        description: 'Online customer support and ticket management',
        email: 'hello@supportmax.de',
        phone_no: '+49-89-5550-1234',
        start_date: new Date('2024-05-01'),
        end_date: new Date('2024-08-31'),
        project_status: 'ACTIVE',
        kloc: 95.5
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project', null, {});
  }
};
