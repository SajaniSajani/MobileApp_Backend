const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Designation = require('./designation');

const user = sequelize.define('user', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  join_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_no: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  user_gender: {
    type: DataTypes.ENUM('Female', 'Male', 'Other'),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  user_status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
    allowNull: false,
  },
  // designation_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: Designation,
  //     key: 'id',
  //   },
  // },
  },
   {
  tableName: 'user',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

// Set up the association
// Designation.hasMany(user,{
//   foreignKey:'designation_id',
// });
// user.belongsTo(Designation, {
//   foreignKey: 'designation_id',
//   as: 'designation',
// });

module.exports =  user ;
