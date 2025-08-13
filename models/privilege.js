const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Privilege = sequelize.define('privilege', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  privilege_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'privilege',
  timestamps: false,
});

module.exports = Privilege ;
