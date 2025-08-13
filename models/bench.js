const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const User = require('./User'); // Adjust if the filename is different
// const user = require('./User');

const Bench = sequelize.define('bench', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  allocated: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bench_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
//   user_id: {
//     type: DataTypes.BIGINT,
//     allowNull: false,
//     references: {
//       model: 'user', // Corrected table name
//       key: 'id',
//     }
//   }
}, {
  tableName: 'bench',
  timestamps: false,
});

// Define association with cascade delete
// user.hasOne(Bench,{
//   foreignKey:'user_id',
// })
// Bench.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'User'
// });

module.exports = Bench;
