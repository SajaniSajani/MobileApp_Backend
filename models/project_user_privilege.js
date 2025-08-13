const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Import foreign key models
// const Privilege = require('./privilege');
// const Project  = require('./project');
// const User = require('./User');

const projectUserPrivilege = sequelize.define('project_user_privilege', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  // privilege_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'privilege',
  //     key: 'id',
  //   },
  // },
  // project_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'project',
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
  tableName: 'project_user_privilege',
  timestamps: false,
});

// Associations
// projectUserPrivilege.belongsTo(Privilege, {
//   foreignKey: 'privilege_id',
//   as: 'Privilege',
// });

// projectUserPrivilege.belongsTo(Project, {
//   foreignKey: 'project_id',
//   as: 'Project',
// });

// projectUserPrivilege.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'User',
// });

module.exports = projectUserPrivilege;
