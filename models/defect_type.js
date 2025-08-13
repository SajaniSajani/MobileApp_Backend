const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DefectType = sequelize.define('defect_type', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  defect_type_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }, },
   {
  tableName: 'defect_type',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

module.exports =  DefectType ;
