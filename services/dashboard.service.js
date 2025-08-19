const DashboardRepository = require('../repositories/dashboard.repository');

class DashboardService {
    async getDefectDensity(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DashboardRepository.getDefectDensity(projectId);
    }

    async getRemarkRatio(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DashboardRepository.getRemarkRatio(projectId);
    }
}

module.exports = new DashboardService();
