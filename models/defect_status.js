const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DefectStatus = sequelize.define('defect_status', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  color_code: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  defect_status_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },},
   {
  tableName: 'defect_status',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

module.exports = DefectStatus ;
