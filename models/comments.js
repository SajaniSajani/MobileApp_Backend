const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Import referenced models
// const Defect = require('./defect');
// const User = require('./User');

const Comment = sequelize.define('comments', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  attachment: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  // defect_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'defect',
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
  tableName: 'comments',
  timestamps: false,
});

// Associations
// Comment.belongsTo(Defect, {
//   foreignKey: 'defect_id',
//   as: 'Defect',
// });

// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'User',
// });

module.exports = Comment;
