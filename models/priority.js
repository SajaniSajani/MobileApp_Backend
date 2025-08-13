const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Priority = sequelize.define('priority', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  color: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  priority: {
    type: DataTypes.STRING(25),
    allowNull: false
  }
}, {
  tableName: 'priority',   // Explicit table name
  timestamps: false        // Disable createdAt and updatedAt
});

module.exports = Priority;