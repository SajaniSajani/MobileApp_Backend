const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// const User = require('./User');
// const  Project  = require('./project');
// const  Module  = require('./modules');
// const  SubModule  = require('./sub_module');

const AllocateModule = sequelize.define('allocate_module', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  // modules_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'modules',
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
  // sub_module_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'sub_module',
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
  tableName: 'allocate_module',
  timestamps: false,
});

// Associations
// AllocateModule.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
// AllocateModule.belongsTo(Project, { foreignKey: 'project_id', as: 'Project' });
// AllocateModule.belongsTo(Module, { foreignKey: 'modules_id', as: 'Module' });
// AllocateModule.belongsTo(SubModule, { foreignKey: 'sub_module_id', as: 'SubModule' });

module.exports = AllocateModule;
