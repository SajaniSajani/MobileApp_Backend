const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// const  Project  = require('./project');
// const  Role  = require('./role');
// const User = require('./User');

const ProjectAllocation = sequelize.define('project_allocation', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  allocation_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE(6),
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
  tableName: 'project_allocation',
  timestamps: false,
});

// Associations
// ProjectAllocation.belongsTo(Project, { foreignKey: 'project_id', as: 'Project' });
// ProjectAllocation.belongsTo(Role, { foreignKey: 'role_id', as: 'Role' });
// ProjectAllocation.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

module.exports = ProjectAllocation;
