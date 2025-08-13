const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
// const  Module = require('./modules');
// import sequelize instance from modules

const SubModule = sequelize.define('sub_module', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  sub_module_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sub_module_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  // module_id: {
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  //   references: {
  //     model: 'modules', // must match your actual model/table name
  //     key: 'id'
  //   },
    
  // }
}, {
  tableName: 'sub_module',
  timestamps: false
});
// Association
// SubModule.belongsTo(Module, {
//   foreignKey: 'module_id',
//   as: 'module',
// });

module.exports =  SubModule ;
