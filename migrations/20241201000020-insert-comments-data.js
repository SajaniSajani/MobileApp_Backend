'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [
      {
        comment: 'Investigating the login button issue',
        attachment: null
      },
      {
        comment: 'Found the issue in the click event handler',
        attachment: null
      },
      {
        comment: 'Working on email validation fix',
        attachment: null
      },
      {
        comment: 'Form validation error identified',
        attachment: null
      },
      {
        comment: 'Search functionality fixed and tested',
        attachment: null
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
