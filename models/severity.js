const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Severity = sequelize.define('severity', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  severity_color: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  severity_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  },
   {
  tableName: 'severity',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

module.exports = Severity;
