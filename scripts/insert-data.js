const { sequelize } = require('../config/database');
const Designation = require('../models/designation');

async function insertDesignationData() {
  try {
    // Sync the database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('Database synced successfully');

    // Insert designation data
    const designations = [
      { designation: 'Software Developer' },
      { designation: 'Senior Software Developer' },
      { designation: 'Team Lead' },
      { designation: 'Project Manager' },
      { designation: 'QA Engineer' },
      { designation: 'DevOps Engineer' },
      { designation: 'UI/UX Designer' },
      { designation: 'Business Analyst' },
      { designation: 'Product Owner' },
      { designation: 'Scrum Master' }
    ];

    // Use bulkCreate with ignoreDuplicates to avoid duplicate entries
    const result = await Designation.bulkCreate(designations, {
      ignoreDuplicates: true,
      updateOnDuplicate: ['designation']
    });

    console.log(`Successfully inserted/updated ${result.length} designations`);
    
    // Display all designations
    const allDesignations = await Designation.findAll();
    console.log('\nAll designations in database:');
    allDesignations.forEach(designation => {
      console.log(`- ${designation.designation}`);
    });

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed');
  }
}

// Run the function
insertDesignationData();
