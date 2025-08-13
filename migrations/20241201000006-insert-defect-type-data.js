'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('defect_type', [
      {
        defect_type_name: 'Bug'
      },
      {
        defect_type_name: 'Feature Request'
      },
      {
        defect_type_name: 'Enhancement'
      },
      {
        defect_type_name: 'Documentation'
      },
      {
        defect_type_name: 'Performance'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('defect_type', null, {});
  }
};
