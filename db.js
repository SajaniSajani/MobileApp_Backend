const { Sequelize } = require('@sequelize/core');
const { MySqlDialect } = require('@sequelize/mysql');

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'node_project', // ur  database name 
  user: 'root', // ur database user name
  password: 'root', // db password
  host: 'localhost',
  port: 3306,
});

module.exports = sequelize;