const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReleaseType = sequelize.define('release_type', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  release_type_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  },
   {
  tableName: 'release_type',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

module.exports = ReleaseType ;
