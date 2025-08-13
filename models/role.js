const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  },
   {
  tableName: 'role',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

module.exports =  Role ;
