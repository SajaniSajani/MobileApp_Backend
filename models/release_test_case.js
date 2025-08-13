const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// const User = require('./User');
// const Release = require('./release'); // assuming a 'release' table exists
// const TestCase = require('./test_case');

const ReleaseTestCase = sequelize.define('release_test_case', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  release_test_case_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  test_case_status: {
    type: DataTypes.ENUM('FAIL', 'NEW', 'PASS'),
    allowNull: false,
  },
  test_date: {
    type: DataTypes.DATE(6),
    allowNull: true,
  },
  test_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  // owner_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'user',
  //     key: 'id',
  //   },
  // },
  // release_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'releases',
  //     key: 'id',
  //   },
  // },
  // test_case_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: true,
  //   references: {
  //     model: 'test_case',
  //     key: 'id',
  //   },
  // },
}, {
  tableName: 'release_test_case',
  timestamps: false,
});

// Associations
// ReleaseTestCase.belongsTo(User, { foreignKey: 'owner_id', as: 'Owner' });
// ReleaseTestCase.belongsTo(Release, { foreignKey: 'release_id', as: 'Release' });
// ReleaseTestCase.belongsTo(TestCase, { foreignKey: 'test_case_id', as: 'TestCase' });

module.exports = ReleaseTestCase;
