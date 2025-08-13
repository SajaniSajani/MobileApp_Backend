const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
// const  User  = require('./User');

const EmailUser = sequelize.define('email_user', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  defect_email_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  module_allocation_email_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  project_allocation_email_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  submodule_allocation_email_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // user_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  // },
  },
   {
  tableName: 'email_user',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

// Association
// EmailUser.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

module.exports =  EmailUser ;
