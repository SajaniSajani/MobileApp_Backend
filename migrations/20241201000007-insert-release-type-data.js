'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('release_type', [
      {
        release_type_name: 'Major Release'
      },
      {
        release_type_name: 'Minor Release'
      },
      {
        release_type_name: 'Patch Release'
      },
      {
        release_type_name: 'Hotfix'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('release_type', null, {});
  }
};
