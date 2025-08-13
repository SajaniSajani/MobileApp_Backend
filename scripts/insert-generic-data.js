const { sequelize } = require('../config/database');

// Import your models here
const Designation = require('../models/designation');
// const User = require('../models/user');
// const Project = require('../models/project');
// Add more models as needed

async function insertGenericData() {
  try {
    // Sync the database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('Database synced successfully');

    // ===== INSERT DESIGNATION DATA =====
    console.log('\n=== Inserting Designation Data ===');
    const designations = [
      { designation: 'Software Developer' },
      { designation: 'Senior Software Developer' },
      { designation: 'Team Lead' },
      { designation: 'Project Manager' },
      { designation: 'QA Engineer' },
      { designation: 'DevOps Engineer' },
      { designation: 'UI/UX Designer' },
      { designation: 'Business Analyst' }
    ];

    const designationResult = await Designation.bulkCreate(designations, {
      ignoreDuplicates: true,
      updateOnDuplicate: ['designation']
    });
    console.log(`✓ Inserted ${designationResult.length} designations`);

    // ===== INSERT USER DATA =====
    // Uncomment and modify this section when you have a User model
    /*
    console.log('\n=== Inserting User Data ===');
    const users = [
      { 
        username: 'john_doe',
        email: 'john@example.com',
        designation_id: 1
      },
      { 
        username: 'jane_smith',
        email: 'jane@example.com',
        designation_id: 2
      }
    ];

    const userResult = await User.bulkCreate(users, {
      ignoreDuplicates: true,
      updateOnDuplicate: ['username', 'email', 'designation_id']
    });
    console.log(`✓ Inserted ${userResult.length} users`);
    */

    // ===== INSERT PROJECT DATA =====
    // Uncomment and modify this section when you have a Project model
    /*
    console.log('\n=== Inserting Project Data ===');
    const projects = [
      { 
        name: 'E-commerce Platform',
        description: 'Online shopping application',
        status: 'active'
      },
      { 
        name: 'Mobile App',
        description: 'Cross-platform mobile application',
        status: 'planning'
      }
    ];

    const projectResult = await Project.bulkCreate(projects, {
      ignoreDuplicates: true,
      updateOnDuplicate: ['name', 'description', 'status']
    });
    console.log(`✓ Inserted ${projectResult.length} projects`);
    */

    console.log('\n=== Data Insertion Complete ===');
    
    // Display summary
    const allDesignations = await Designation.findAll();
    console.log(`\nTotal designations in database: ${allDesignations.length}`);

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the function
insertGenericData();
