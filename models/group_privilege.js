const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import referenced models
// const Privilege = require('./privilege');
// const Role = require('./role');

const GroupPrivilege = sequelize.define('group_privilege', {
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
  // role_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'role',
  //     key: 'id',
  //   },
  // },
}, {
  tableName: 'group_privilege',
  timestamps: false,
});

// Associations
// GroupPrivilege.belongsTo(Privilege, {
//   foreignKey: 'privilege_id',
//   as: 'Privilege',
// });

// GroupPrivilege.belongsTo(Role, {
//   foreignKey: 'role_id',
//   as: 'Role',
// });

module.exports = GroupPrivilege;
