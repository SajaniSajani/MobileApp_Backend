const Defect = require('../models/defect');

class DefectRepository {
    async findAll() {
        return await Defect.findAll();
    }

    async findById(id) {
        return await Defect.findByPk(id);
    }

    async create(defectData) {
        return await Defect.create(defectData);
    }

    async update(id, updateData) {
        const defect = await Defect.findByPk(id);
        if (defect) {
            return await defect.update(updateData);
        }
        return null;
    }

    async delete(id) {
        const defect = await Defect.findByPk(id);
        if (defect) {
            await defect.destroy();
            return true;
        }
        return false;
    }

    async findByDefectId(defectId) {
        return await Defect.findOne({
            where: { defect_id: defectId }
        });
    }

    async findByStatus(statusId) {
        return await Defect.findAll({
            where: { defect_status_id: statusId }
        });
    }

    async findByProject(projectId) {
        return await Defect.findAll({
            where: { project_id: projectId }
        });
    }

    async findByAssignedTo(userId) {
        return await Defect.findAll({
            where: { assigned_to: userId }
        });
    }

    async findByAssignedBy(userId) {
        return await Defect.findAll({
            where: { assigned_by: userId }
        });
    }

    async findByPriority(priorityId) {
        return await Defect.findAll({
            where: { priority_id: priorityId }
        });
    }

    async findBySeverity(severityId) {
        return await Defect.findAll({
            where: { severity_id: severityId }
        });
    }

    async findByModule(moduleId) {
        return await Defect.findAll({
            where: { modules_id: moduleId }
        });
    }

    async findByType(typeId) {
        return await Defect.findAll({
            where: { type_id: typeId }
        });
    }

    async findBySubModule(subModuleId) {
        return await Defect.findAll({
            where: { sub_module_id: subModuleId }
        });
    }

    async findByReleaseTestCase(releaseTestCaseId) {
        return await Defect.findAll({
            where: { release_test_case_id: releaseTestCaseId }
        });
    }

    async findWithHighReopenCount() {
        return await Defect.findAll({
            where: {
                re_open_count: {
                    [require('sequelize').Op.gte]: 3
                }
            }
        });
    }
}

module.exports = new DefectRepository();
