const Project = require('../models/project');

class ProjectRepository {
    async findAll() {
        return await Project.findAll();
    }

    async findById(id) {
        return await Project.findByPk(id);
    }

    async create(projectData) {
        return await Project.create(projectData);
    }

    async update(id, updateData) {
        const project = await Project.findByPk(id);
        if (project) {
            return await project.update(updateData);
        }
        return null;
    }

    async delete(id) {
        const project = await Project.findByPk(id);
        if (project) {
            await project.destroy();
            return true;
        }
        return false;
    }

    async findByStatus(status) {
        return await Project.findAll({
            where: { project_status: status }
        });
    }

    async findByProjectId(projectId) {
        return await Project.findOne({
            where: { project_id: projectId }
        });
    }
}

module.exports = new ProjectRepository();
