const { Sequelize } = require('sequelize');

const config = {
  development: {
    username: 'root',
    password: 'root',
    database: 'node_project',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'node_project_test',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: 'root',
    database: 'node_project_prod',
    host: 'localhost',
    dialect: 'mysql'
  }
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
}); 

// Export the config for Sequelize CLI
module.exports = config;

// Export the sequelize instance for the application
module.exports.sequelize = sequelize;