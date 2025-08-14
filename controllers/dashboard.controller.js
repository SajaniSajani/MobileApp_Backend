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
}

module.exports = new DashboardController();
