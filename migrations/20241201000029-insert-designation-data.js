'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('designation', [
			{ designation: 'Software Engineer' },
			{ designation: 'Senior Software Engineer' },
			{ designation: 'Team Lead' },
			{ designation: 'QA Engineer' },
			{ designation: 'Project Manager' },
			{ designation: 'Business Analyst' },
			{ designation: 'UI/UX Designer' },
			{ designation: 'DevOps Engineer' },
			{ designation: 'Product Manager' },
			{ designation: 'Scrum Master' }
		], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('designation', null, {});
	}
};
