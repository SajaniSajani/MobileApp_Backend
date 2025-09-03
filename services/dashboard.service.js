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

    async getDefectSeverityIndex(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DashboardRepository.getDefectSeverityIndex(projectId);
    }

    async getDefectSeverityBreakdown(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DashboardRepository.getDefectSeverityBreakdown(projectId);
    }

    async getDefectSummaryByModule(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DashboardRepository.getDefectSummaryByModule(projectId);
    }

    async getDefectTypeBreakdown(projectId) {
        if (!projectId || isNaN(projectId)) {
            throw new Error('Valid project ID is required');
        }
        return await DashboardRepository.getDefectTypeBreakdown(projectId);
    }
}

module.exports = new DashboardService();
