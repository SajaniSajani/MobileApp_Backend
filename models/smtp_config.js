const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust path if needed

const SmtpConfig = sequelize.define('smtp_config', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  from_email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  from_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  smtp_host: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  smtp_port: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'smtp_config',
  timestamps: false,
});

module.exports = SmtpConfig;
