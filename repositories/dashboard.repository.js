const Defect = require('../models/defect');
const Project = require('../models/project');

class DashboardRepository {
    async getDefectCountByProject(projectId) {
        return await Defect.count({
            where: { project_id: projectId }
        });
    }

    async getDefectDensity(projectId) {
        const defectCount = await this.getDefectCountByProject(projectId);
        const project = await Project.findByPk(projectId);
        
        if (!project) {
            throw new Error('Project not found');
        }
        
        const kloc = project.kloc || 0;
        const defectDensity = kloc > 0 ? defectCount / kloc : 0;
        const densityValue = parseFloat(defectDensity.toFixed(4));
        
        // Determine color and meaning based on defect density
        let color, meaning, range;
        
        if (densityValue <= 7.0) {
            color = 'Green';
            meaning = 'Good';
            range = '0.0 – 7.0';
        } else if (densityValue > 7.0 && densityValue <= 10.0) {
            color = 'Yellow';
            meaning = 'Moderate Quality';
            range = '7.0 – 10.0';
        } else {
            color = 'Red';
            meaning = 'High Risk';
            range = 'Above 10.0';
        }
        
        return {
            projectId,
            projectName: project.project_name,
            defectCount,
            kloc,
            defectDensity: densityValue,
            color,
            // meaning,
            range
        };
    }
}

module.exports = new DashboardRepository();
