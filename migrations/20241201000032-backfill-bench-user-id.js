'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const qi = queryInterface;
    const table = 'bench';

    // 1) Ensure user_id column exists
    const desc = await qi.describeTable(table);
    if (!desc.user_id) {
      await qi.addColumn(table, 'user_id', { type: Sequelize.BIGINT, allowNull: true });
    }

    // 2) Backfill NULLs with the first user.id
    const [[firstUser]] = await qi.sequelize.query('SELECT id FROM `user` ORDER BY id ASC LIMIT 1');
    if (!firstUser) {
      throw new Error('No users found to backfill bench.user_id. Insert a user first.');
    }
    await qi.sequelize.query('UPDATE `bench` SET `user_id` = :userId WHERE `user_id` IS NULL', {
      replacements: { userId: firstUser.id }
    });

    // 3) Drop existing FK constraints on bench.user_id (e.g., ON DELETE SET NULL)
    try {
      const fks = await qi.getForeignKeyReferencesForTable(table);
      for (const fk of fks) {
        if (fk.columnName === 'user_id') {
          try { await qi.removeConstraint(table, fk.constraintName); } catch (e) {}
        }
      }
    } catch (e) {}

    // 4) Enforce NOT NULL
    await qi.changeColumn(table, 'user_id', { type: Sequelize.BIGINT, allowNull: false });

    // 5) Add FK constraint (RESTRICT) if missing
    const fksAfter = await qi.getForeignKeyReferencesForTable(table);
    const hasFk = fksAfter.some(f => f.columnName === 'user_id');
    if (!hasFk) {
      await qi.addConstraint(table, {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'bench_user_id_fk',
        references: { table: 'user', field: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const qi = queryInterface;
    const table = 'bench';

    // Remove FK if present
    try {
      const fks = await qi.getForeignKeyReferencesForTable(table);
      for (const fk of fks) {
        if (fk.columnName === 'user_id') {
          try { await qi.removeConstraint(table, fk.constraintName); } catch (e) {}
        }
      }
    } catch (e) {}

    // Allow NULL again
    try {
      await qi.changeColumn(table, 'user_id', { type: Sequelize.BIGINT, allowNull: true });
    } catch (e) {}
  }
};
