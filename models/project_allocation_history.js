const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// const  Project  = require('./project');
// const Role  = require('./role');
// const User = require('./User');

const ProjectAllocationHistory = sequelize.define('project_allocation_history', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  end_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  // project_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'project',
  //     key: 'id',
  //   },
  // },
  // role_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'role',
  //     key: 'id',
  //   },
  // },
  // user_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'user',
  //     key: 'id',
  //   },
  // },
}, {
  tableName: 'project_allocation_history',
  timestamps: false,
});

// Associations
// ProjectAllocationHistory.belongsTo(Project, { foreignKey: 'project_id', as: 'Project' });
// ProjectAllocationHistory.belongsTo(Role, { foreignKey: 'role_id', as: 'Role' });
// ProjectAllocationHistory.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

module.exports = ProjectAllocationHistory;
