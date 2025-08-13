const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Designation = sequelize.define('designation', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  designation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
  },
   {
  tableName: 'designation',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

module.exports =  Designation ;
