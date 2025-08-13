const ProjectRepository = require('../repositories/project.repository');

class ProjectService {
    async getAllProjects() {
        return await ProjectRepository.findAll();
    }

    async getProjectById(id) {
        return await ProjectRepository.findById(id);
    }

    async createProject(projectData) {
        // Validate required fields
        const requiredFields = ['client_name', 'country', 'email', 'end_date', 'project_id', 'project_name', 'start_date'];
        for (const field of requiredFields) {
            if (!projectData[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Check if project_id already exists
        const existingProject = await ProjectRepository.findByProjectId(projectData.project_id);
        if (existingProject) {
            throw new Error('Project ID already exists');
        }

        return await ProjectRepository.create(projectData);
    }

    async updateProject(id, updateData) {
        // If project_id is being updated, check for uniqueness
        if (updateData.project_id) {
            const existingProject = await ProjectRepository.findByProjectId(updateData.project_id);
            if (existingProject && existingProject.id != id) {
                throw new Error('Project ID already exists');
            }
        }

        return await ProjectRepository.update(id, updateData);
    }

    async deleteProject(id) {
        return await ProjectRepository.delete(id);
    }

    async getProjectsByStatus(status) {
        const validStatuses = ['ACTIVE', 'COMPLETED', 'INACTIVE', 'ON_HOLD'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid project status');
        }
        return await ProjectRepository.findByStatus(status);
    }
}

module.exports = new ProjectService();
