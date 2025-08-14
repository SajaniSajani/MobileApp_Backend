const DefectService = require('../services/defect.service');

class DefectController {
    async getAllDefects(req, res) {
        try {
            const defects = await DefectService.getAllDefects();
            res.status(200).json({
                success: true,
                data: defects,
                message: 'Defects retrieved successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defects',
                error: error.message
            });
        }
    }

    async getDefectById(req, res) {
        try {
            const { id } = req.params;
            const defect = await DefectService.getDefectById(id);
            
            if (!defect) {
                return res.status(404).json({
                    success: false,
                    message: 'Defect not found'
                });
            }

            res.status(200).json({
                success: true,
                data: defect,
                message: 'Defect retrieved successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defect',
                error: error.message
            });
        }
    }

    async createDefect(req, res) {
        try {
            const defectData = req.body;
            const newDefect = await DefectService.createDefect(defectData);
            
            res.status(201).json({
                success: true,
                data: newDefect,
                message: 'Defect created successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating defect',
                error: error.message
            });
        }
    }

    async updateDefect(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            const updatedDefect = await DefectService.updateDefect(id, updateData);
            
            if (!updatedDefect) {
                return res.status(404).json({
                    success: false,
                    message: 'Defect not found'
                });
            }

            res.status(200).json({
                success: true,
                data: updatedDefect,
                message: 'Defect updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating defect',
                error: error.message
            });
        }
    }

    async deleteDefect(req, res) {
        try {
            const { id } = req.params;
            const deleted = await DefectService.deleteDefect(id);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Defect not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Defect deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting defect',
                error: error.message
            });
        }
    }

    async getDefectsByStatus(req, res) {
        try {
            const { statusId } = req.params;
            const defects = await DefectService.getDefectsByStatus(statusId);
            
            res.status(200).json({
                success: true,
                data: defects,
                message: `Defects with status ID ${statusId} retrieved successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defects by status',
                error: error.message
            });
        }
    }

    async getDefectsByProject(req, res) {
        try {
            const { projectId } = req.params;
            const defects = await DefectService.getDefectsByProject(projectId);
            
            res.status(200).json({
                success: true,
                data: defects,
                message: `Defects for project ID ${projectId} retrieved successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defects by project',
                error: error.message
            });
        }
    }

    async getDefectsByAssignedTo(req, res) {
        try {
            const { userId } = req.params;
            const defects = await DefectService.getDefectsByAssignedTo(userId);
            
            res.status(200).json({
                success: true,
                data: defects,
                message: `Defects assigned to user ID ${userId} retrieved successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defects by assigned user',
                error: error.message
            });
        }
    }

    async getDefectsByPriority(req, res) {
        try {
            const { priorityId } = req.params;
            const defects = await DefectService.getDefectsByPriority(priorityId);
            
            res.status(200).json({
                success: true,
                data: defects,
                message: `Defects with priority ID ${priorityId} retrieved successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defects by priority',
                error: error.message
            });
        }
    }

    async getDefectsBySeverity(req, res) {
        try {
            const { severityId } = req.params;
            const defects = await DefectService.getDefectsBySeverity(severityId);
            
            res.status(200).json({
                success: true,
                data: defects,
                message: `Defects with severity ID ${severityId} retrieved successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving defects by severity',
                error: error.message
            });
        }
    }
}

module.exports = new DefectController();
