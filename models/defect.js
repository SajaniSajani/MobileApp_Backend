const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Import referenced models
// const User = require('./User');
// const DefectStatus = require('./defect_status');
// const  DefectType  = require('./defect_type');
// const  Module  = require('./modules');
// const Priority = require('./priority');
// const Project  = require('./project');
// const ReleaseTestCase = require('./release_test_case');
// const Severity = require('./severity');
// const SubModule = require('./sub_module');

const Defect = sequelize.define('defect', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  attachment: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  defect_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  re_open_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  steps: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  // assigned_by: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'user',
  //     key: 'id',
  //   },
  // },
  // assigned_to: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'user',
  //     key: 'id',
  //   },
  // },
  // defect_status_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'defect_status',
  //     key: 'id',
  //   },
  // },
  // type_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'defect_type',
  //     key: 'id',
  //   },
  // },
  // modules_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'modules',
  //     key: 'id',
  //   },
  // },
  // priority_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'priority',
  //     key: 'id',
  //   },
  // },
  // project_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'project',
  //     key: 'id',
  //   },
  // },
  // release_test_case_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'release_test_case',
  //     key: 'id',
  //   },
  // },
  // severity_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'severity',
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
}, {
  tableName: 'defect',
  timestamps: false,
});

// Associations
// Defect.belongsTo(User, { foreignKey: 'assigned_by', as: 'AssignedBy' });
// Defect.belongsTo(User, { foreignKey: 'assigned_to', as: 'AssignedTo' });
// Defect.belongsTo(DefectStatus, { foreignKey: 'defect_status_id', as: 'DefectStatus' });
// Defect.belongsTo(DefectType, { foreignKey: 'type_id', as: 'Type' });
// Defect.belongsTo(Module, { foreignKey: 'modules_id', as: 'Module' });
// Defect.belongsTo(Priority, { foreignKey: 'priority_id', as: 'Priority' });
// Defect.belongsTo(Project, { foreignKey: 'project_id', as: 'Project' });
// Defect.belongsTo(ReleaseTestCase, { foreignKey: 'release_test_case_id', as: 'ReleaseTestCase' });
// Defect.belongsTo(Severity, { foreignKey: 'severity_id', as: 'Severity' });
// Defect.belongsTo(SubModule, { foreignKey: 'sub_module_id', as: 'SubModule' });

module.exports = Defect;
