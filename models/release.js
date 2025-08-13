const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// const  Project  = require('./project');
// const  ReleaseType  = require('./release_type');

const Release = sequelize.define('release', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  release_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  release_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  releasedate: {
    type: DataTypes.DATE(6),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN, // for bit(1)
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
  // release_type_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'release_type',
  //     key: 'id',
  //   },
  // },
}, {
  tableName: 'releases',
  timestamps: false,
});

// Associations
// Release.belongsTo(Project, { foreignKey: 'project_id', as: 'Project' });
// Release.belongsTo(ReleaseType, { foreignKey: 'release_type_id', as: 'ReleaseType' });

module.exports =  Release ;
