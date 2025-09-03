const DashboardService = require('../services/dashboard.service');

class DashboardController {
    async getDefectDensity(req, res) {
        try {
            const { projectId } = req.params;
            const defectDensity = await DashboardService.getDefectDensity(projectId);
            
            res.status(200).json({
                success: true,
                data: defectDensity,
                message: 'Defect density retrieved successfully'
            });
        } catch (error) {
            if (error.message === 'Project not found') {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error retrieving defect density',
                error: error.message
            });
        }
    }

    async getRemarkRatio(req, res) {
        try {
            const { projectId } = req.params;
            const result = await DashboardService.getRemarkRatio(projectId);

            // Empty result case
            if (result && Object.keys(result).length === 0) {
                return res.status(200).json({ success: true, data: {}, message: 'No data' });
            }

            res.status(200).json({
                success: true,
                data: result,
                message: 'Remark ratio retrieved successfully'
            });
        } catch (error) {
            if (error.message && error.message.startsWith('Project not found')) {
                return res.status(404).json({ success: false, message: 'Project not found' });
            }
            if (error.code === 'INVALID_COUNTS') {
                return res.status(400).json({
                    success: false,
                    message: 'Defect count should not exceed remark count',
                    data: error.details
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error retrieving remark ratio',
                error: error.message
            });
        }
    }

    async getDefectSeverityIndex(req, res) {
        try {
            const { projectId } = req.params;
            const result = await DashboardService.getDefectSeverityIndex(projectId);

            res.status(200).json(result);
        } catch (error) {
            if (error.message && error.message.startsWith('Project not found')) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Project not found' 
                });
            }
            
            res.status(500).json({
                success: false,
                message: 'Error retrieving Defect Severity Index',
                error: error.message
            });
        }
    }

    async getDefectSeverityBreakdown(req, res) {
        try {
            const { projectId } = req.params;
            const result = await DashboardService.getDefectSeverityBreakdown(projectId);
            res.status(200).json({ success: true, data: result, message: 'Defect severity breakdown retrieved successfully' });
        } catch (error) {
            if (error.message && error.message.startsWith('Project not found')) {
                return res.status(404).json({ success: false, message: 'Project not found' });
            }
            res.status(500).json({ success: false, message: 'Error retrieving defect severity breakdown', error: error.message });
        }
    }

    async getDefectSummaryByModule(req, res) {
        try {
            const { projectId } = req.params;
            const result = await DashboardService.getDefectSummaryByModule(projectId);
            res.status(200).json({ success: true, data: result, message: 'Defect summary by module retrieved successfully' });
        } catch (error) {
            if (error.message && error.message.startsWith('Project not found')) {
                return res.status(404).json({ success: false, message: 'Project not found' });
            }
            res.status(500).json({ success: false, message: 'Error retrieving defect summary by module', error: error.message });
        }
    }

    async getDefectTypeBreakdown(req, res) {
        try {
            const { projectId } = req.params;
            const result = await DashboardService.getDefectTypeBreakdown(projectId);
            res.status(200).json({ success: true, data: result, message: 'Defect type breakdown retrieved successfully' });
        } catch (error) {
            if (error.message && error.message.startsWith('Project not found')) {
                return res.status(404).json({ success: false, message: 'Project not found' });
            }
            res.status(500).json({ success: false, message: 'Error retrieving defect type breakdown', error: error.message });
        }
    }
}

module.exports = new DashboardController();
