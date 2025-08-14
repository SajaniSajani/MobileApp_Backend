const DefectRepository = require('../repositories/defect.repository');

class DefectService {
    async getAllDefects() {
        return await DefectRepository.findAll();
    }

    async getDefectById(id) {
        return await DefectRepository.findById(id);
    }

    async createDefect(defectData) {
        // Validate required fields
        const requiredFields = ['defect_id', 'description', 'steps', 're_open_count'];
        for (const field of requiredFields) {
            if (!defectData[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Validate re_open_count is a non-negative integer
        if (defectData.re_open_count < 0 || !Number.isInteger(defectData.re_open_count)) {
            throw new Error('re_open_count must be a non-negative integer');
        }

        // Check if defect_id already exists
        const existingDefect = await DefectRepository.findByDefectId(defectData.defect_id);
        if (existingDefect) {
            throw new Error('Defect ID already exists');
        }

        // Set default values for optional fields
        const defectWithDefaults = {
            ...defectData,
            re_open_count: defectData.re_open_count || 0,
            attachment: defectData.attachment || null
        };

        return await DefectRepository.create(defectWithDefaults);
    }

    async updateDefect(id, updateData) {
        // If defect_id is being updated, check for uniqueness
        if (updateData.defect_id) {
            const existingDefect = await DefectRepository.findByDefectId(updateData.defect_id);
            if (existingDefect && existingDefect.id != id) {
                throw new Error('Defect ID already exists');
            }
        }

        // Validate re_open_count if provided
        if (updateData.re_open_count !== undefined) {
            if (updateData.re_open_count < 0 || !Number.isInteger(updateData.re_open_count)) {
                throw new Error('re_open_count must be a non-negative integer');
            }
        }

        return await DefectRepository.update(id, updateData);
    }

    async deleteDefect(id) {
        return await DefectRepository.delete(id);
    }

    async getDefectsByStatus(statusId) {
        if (!statusId || isNaN(statusId)) {
            throw new Error('Valid status ID is required');
        }
        return await DefectRepository.findByStatus(statusId);
    }

    async getDefectsByProject(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DefectRepository.findByProject(projectId);
    }

    async getDefectsByAssignedTo(userId) {
        if (!userId || isNaN(userId)) {
            throw new Error('Valid user ID is required');
        }
        return await DefectRepository.findByAssignedTo(userId);
    }

    async getDefectsByAssignedBy(userId) {
        if (!userId || isNaN(userId)) {
            throw new Error('Valid user ID is required');
        }
        return await DefectRepository.findByAssignedBy(userId);
    }

    async getDefectsByPriority(priorityId) {
        if (!priorityId || isNaN(priorityId)) {
            throw new Error('Valid priority ID is required');
        }
        return await DefectRepository.findByPriority(priorityId);
    }

    async getDefectsBySeverity(severityId) {
        if (!severityId || isNaN(severityId)) {
            throw new Error('Valid severity ID is required');
        }
        return await DefectRepository.findBySeverity(severityId);
    }

    async getDefectsByModule(moduleId) {
        if (!moduleId || isNaN(moduleId)) {
            throw new Error('Valid module ID is required');
        }
        return await DefectRepository.findByModule(moduleId);
    }

    async getDefectsByType(typeId) {
        if (!typeId || isNaN(typeId)) {
            throw new Error('Valid type ID is required');
        }
        return await DefectRepository.findByType(typeId);
    }

    async getDefectsBySubModule(subModuleId) {
        if (!subModuleId || isNaN(subModuleId)) {
            throw new Error('Valid sub-module ID is required');
        }
        return await DefectRepository.findBySubModule(subModuleId);
    }

    async getDefectsByReleaseTestCase(releaseTestCaseId) {
        if (!releaseTestCaseId || isNaN(releaseTestCaseId)) {
            throw new Error('Valid release test case ID is required');
        }
        return await DefectRepository.findByReleaseTestCase(releaseTestCaseId);
    }

    async getDefectsWithHighReopenCount() {
        return await DefectRepository.findWithHighReopenCount();
    }

    async incrementReopenCount(id) {
        const defect = await DefectRepository.findById(id);
        if (!defect) {
            throw new Error('Defect not found');
        }

        const newReopenCount = defect.re_open_count + 1;
        return await DefectRepository.update(id, { re_open_count: newReopenCount });
    }
}

module.exports = new DefectService();
