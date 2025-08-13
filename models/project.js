const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const User = require('./User');

const Project = sequelize.define('project', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  client_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  kloc: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  phone_no: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  project_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  project_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  project_status: {
    type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'INACTIVE', 'ON_HOLD'),
    defaultValue: 'ACTIVE',
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(255),
    allowNull: true,
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
  tableName: 'project',   // Explicit table name
  timestamps: false    // Disable createdAt and updatedAt
});

// Association
// Project.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

module.exports =  Project ;
