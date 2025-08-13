const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// const Project  = require('./project');
// const Module = require('./modules');
// const SubModule  = require('./sub_module');
// const Severity = require('./severity');
// const  DefectType  = require('./defect_type'); // Assuming `type_id` refers to defect type

const TestCase = sequelize.define('test_case', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  steps: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  test_case_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  // type_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'defect_type', // foreign key to defect_type
  //     key: 'id',
  //   },
  // },
  // module_id: {
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
  // severity_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
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
  tableName: 'test_case',
  timestamps: false,
});

// Associations
// TestCase.belongsTo(Project, { foreignKey: 'project_id', as: 'Project' });
// TestCase.belongsTo(Module, { foreignKey: 'module_id', as: 'Module' });
// TestCase.belongsTo(SubModule, { foreignKey: 'sub_module_id', as: 'SubModule' });
// TestCase.belongsTo(Severity, { foreignKey: 'severity_id', as: 'Severity' });
// TestCase.belongsTo(DefectType, { foreignKey: 'type_id', as: 'DefectType' });

module.exports = TestCase;
