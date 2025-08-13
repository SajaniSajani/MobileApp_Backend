const ProjectService = require('../services/project.service');

class ProjectController {
    async getAllProjects(req, res) {
        try {
            const projects = await ProjectService.getAllProjects();
            res.status(200).json({
                success: true,
                data: projects,
                message: 'Projects retrieved successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving projects',
                error: error.message
            });
        }
    }

    async getProjectById(req, res) {
        try {
            const { id } = req.params;
            const project = await ProjectService.getProjectById(id);
            
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.status(200).json({
                success: true,
                data: project,
                message: 'Project retrieved successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving project',
                error: error.message
            });
        }
    }

    async createProject(req, res) {
        try {
            const projectData = req.body;
            const newProject = await ProjectService.createProject(projectData);
            
            res.status(201).json({
                success: true,
                data: newProject,
                message: 'Project created successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating project',
                error: error.message
            });
        }
    }

    async updateProject(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            
            const updatedProject = await ProjectService.updateProject(id, updateData);
            
            if (!updatedProject) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.status(200).json({
                success: true,
                data: updatedProject,
                message: 'Project updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating project',
                error: error.message
            });
        }
    }

    async deleteProject(req, res) {
        try {
            const { id } = req.params;
            const deleted = await ProjectService.deleteProject(id);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Project deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting project',
                error: error.message
            });
        }
    }

    async getProjectsByStatus(req, res) {
        try {
            const { status } = req.params;
            const projects = await ProjectService.getProjectsByStatus(status);
            
            res.status(200).json({
                success: true,
                data: projects,
                message: `Projects with status ${status} retrieved successfully`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving projects by status',
                error: error.message
            });
        }
    }
}

module.exports = new ProjectController();
