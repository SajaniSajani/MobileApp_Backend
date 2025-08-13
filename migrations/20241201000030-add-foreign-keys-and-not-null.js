'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const qi = queryInterface;

		async function ensureColumn(table, column, definition) {
			const desc = await qi.describeTable(table);
			if (!desc[column]) {
				await qi.addColumn(table, column, definition);
			}
		}

		async function getFirstId(table) {
			const [[row]] = await qi.sequelize.query(`SELECT id FROM \`${table}\` ORDER BY id ASC LIMIT 1`);
			return row ? row.id : null;
		}

		async function backfill(table, column, value) {
			if (value === null || value === undefined) return;
			await qi.sequelize.query(`UPDATE \`${table}\` SET \`${column}\` = :value WHERE \`${column}\` IS NULL`, { replacements: { value } });
		}

		async function dropFkIfExists(table, column) {
			try {
				const constraints = await qi.getForeignKeyReferencesForTable(table);
				for (const c of constraints) {
					if (c.columnName === column) {
						try { await qi.removeConstraint(table, c.constraintName); } catch (e) {}
					}
				}
			} catch (e) {}
		}

		async function setNotNull(table, column) {
			const desc = await qi.describeTable(table);
			if (desc[column] && desc[column].allowNull) {
				await qi.changeColumn(table, column, { type: Sequelize.BIGINT, allowNull: false });
			}
		}

		async function addFk(table, column, refTable, constraintName) {
			await qi.addConstraint(table, {
				type: 'foreign key',
				fields: [column],
				name: constraintName,
				references: { table: refTable, field: 'id' },
				onUpdate: 'RESTRICT',
				onDelete: 'RESTRICT',
			});
		}

		const fkPlan = {
			comments: [
				{ column: 'defect_id', ref: 'defect' },
				{ column: 'user_id', ref: 'user' },
			],
			defect_history: [
				{ column: 'defect_id', ref: 'defect' },
			],
			bench: [
				{ column: 'user_id', ref: 'user' },
			],
			user: [
				{ column: 'designation_id', ref: 'designation' },
			],
			modules: [
				{ column: 'project_id', ref: 'project' },
			],
			project: [
				{ column: 'user_id', ref: 'user' },
			],
			defect: [
				{ column: 'assigned_by', ref: 'user', nullable: true },
				{ column: 'assigned_to', ref: 'user', nullable: true },
				{ column: 'defect_status_id', ref: 'defect_status' },
				{ column: 'type_id', ref: 'defect_type' },
				{ column: 'modules_id', ref: 'modules' },
				{ column: 'priority_id', ref: 'priority' },
				{ column: 'project_id', ref: 'project' },
				{ column: 'release_test_case_id', ref: 'release_test_case', nullable: true },
				{ column: 'severity_id', ref: 'severity' },
				{ column: 'sub_module_id', ref: 'sub_module', nullable: true },
			],
			email_user: [
				{ column: 'user_id', ref: 'user' },
			],
			release_test_case: [
				{ column: 'owner_id', ref: 'user' },
				{ column: 'release_id', ref: 'releases' },
				{ column: 'test_case_id', ref: 'test_case' },
			],
			project_allocation: [
				{ column: 'project_id', ref: 'project' },
				{ column: 'role_id', ref: 'role' },
				{ column: 'user_id', ref: 'user' },
			],
			project_allocation_history: [
				{ column: 'project_id', ref: 'project' },
				{ column: 'role_id', ref: 'role' },
				{ column: 'user_id', ref: 'user' },
			],
			allocate_module: [
				{ column: 'modules_id', ref: 'modules' },
				{ column: 'project_id', ref: 'project' },
				{ column: 'sub_module_id', ref: 'sub_module', nullable: true },
				{ column: 'user_id', ref: 'user' },
			],
			group_privilege: [
				{ column: 'privilege_id', ref: 'privilege' },
				{ column: 'role_id', ref: 'role' },
			],
			user_privilege: [
				{ column: 'privilege_id', ref: 'privilege' },
				{ column: 'project_id', ref: 'project' },
				{ column: 'user_id', ref: 'user' },
			],
			project_user_privilege: [
				{ column: 'privilege_id', ref: 'privilege' },
				{ column: 'project_id', ref: 'project' },
				{ column: 'user_id', ref: 'user' },
			],
			releases: [
				{ column: 'project_id', ref: 'project' },
				{ column: 'release_type_id', ref: 'release_type' },
			],
			sub_module: [
				{ column: 'module_id', ref: 'modules' },
			],
			test_case: [
				{ column: 'type_id', ref: 'defect_type' },
				{ column: 'module_id', ref: 'modules' },
				{ column: 'project_id', ref: 'project' },
				{ column: 'severity_id', ref: 'severity' },
				{ column: 'sub_module_id', ref: 'sub_module', nullable: true },
			],
		};

		for (const [table, cols] of Object.entries(fkPlan)) {
			for (const { column, ref, nullable } of cols) {
				await ensureColumn(table, column, { type: Sequelize.BIGINT, allowNull: true });
				const refId = await getFirstId(ref);
				await backfill(table, column, refId);
				await dropFkIfExists(table, column);
				if (!nullable) {
					await setNotNull(table, column);
				}
				await addFk(table, column, ref, `${table}_${column}_fk`);
			}
		}
	},

	async down(queryInterface, Sequelize) {
		const qi = queryInterface;
		const fkMap = {
			comments: ['defect_id','user_id'],
			defect_history: ['defect_id'],
			user: ['designation_id'],
			modules: ['project_id'],
			project: ['user_id'],
			defect: ['assigned_by','assigned_to','defect_status_id','type_id','modules_id','priority_id','project_id','release_test_case_id','severity_id','sub_module_id'],
			email_user: ['user_id'],
			release_test_case: ['owner_id','release_id','test_case_id'],
			project_allocation: ['project_id','role_id','user_id'],
			project_allocation_history: ['project_id','role_id','user_id'],
			allocate_module: ['modules_id','project_id','sub_module_id','user_id'],
			group_privilege: ['privilege_id','role_id'],
			user_privilege: ['privilege_id','project_id','user_id'],
			project_user_privilege: ['privilege_id','project_id','user_id'],
			releases: ['project_id','release_type_id'],
			sub_module: ['module_id'],
			test_case: ['type_id','module_id','project_id','severity_id','sub_module_id'],
		};
		for (const [table, cols] of Object.entries(fkMap)) {
			try {
				const constraints = await qi.getForeignKeyReferencesForTable(table);
				for (const c of constraints) {
					if (cols.includes(c.columnName)) {
						try { await qi.removeConstraint(table, c.constraintName); } catch (e) {}
					}
				}
			} catch (e) {}
		}
	}
};
