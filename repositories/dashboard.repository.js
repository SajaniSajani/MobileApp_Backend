const Defect = require('../models/defect');
const Project = require('../models/project');
const DefectStatus = require('../models/defect_status');

class DashboardRepository {
    async getDefectCountByProject(projectId) {
        return await Defect.count({
            where: { project_id: projectId }
        });
    }

    async getDefectDensity(projectId) {
        // 1. Find project
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project not found with ID: ${projectId}`);
        }

        // 2. Count all defects → totalDefects
        const totalDefects = await Defect.count({ 
            where: { project_id: projectId } 
        });

        // 3. Find rejected defects → rejectedDefects
        const rejectStatus = await DefectStatus.findOne({
            where: { defect_status_name: "Reject" }
        });
        
        const rejectedDefects = rejectStatus ? await Defect.count({
            where: { 
                project_id: projectId, 
                defect_status_id: rejectStatus.id 
            }
        }) : 0;

        // 4. Find duplicate defects → duplicateDefects
        const duplicateStatus = await DefectStatus.findOne({
            where: { defect_status_name: "Duplicate" }
        });
        
        const duplicateDefects = duplicateStatus ? await Defect.count({
            where: { 
                project_id: projectId, 
                defect_status_id: duplicateStatus.id 
            }
        }) : 0;

        // 5. Calculate valid defects → validDefects = totalDefects - (rejectedDefects + duplicateDefects)
        const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

        // 6. Calculate defect density → defectDensity = validDefects / KLOC (if KLOC > 0, else 0)
        const kloc = project.kloc || 0;
        const defectDensity = kloc > 0 ? validDefects / kloc : 0.0;
        const densityValue = parseFloat(defectDensity.toFixed(4));

        // 7. Determine color, meaning, range based on defect density
        let color, meaning, range;
        if (densityValue <= 7.0) {
            color = "Green";
            meaning = "Good";
            range = "0.0 – 7.0";
        } else if (densityValue <= 10.0) {
            color = "Yellow";
            meaning = "Moderate Quality";
            range = "7.0 – 10.0";
        } else {
            color = "Red";
            meaning = "High Risk";
            range = "Above 10.0";
        }

        // 8. Prepare response with all calculation details
        return {
            projectId: project.id,
            projectName: project.project_name,
            clientName: project.client_name,
            kloc,
            totalDefects,
            rejectedDefects,
            duplicateDefects,
            validDefects,
            defectDensity: densityValue,
            color,
            meaning,
            range,
        };
    }

    async getRemarkRatio(projectId) {
        // Ensure project exists (aligns with existing pattern)
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project not found with ID: ${projectId}`);
        }

        // Total defects including rejected/duplicate → remarksCount
        const remarksCount = await Defect.count({
            where: { project_id: projectId }
        });

        // Find rejected and duplicate statuses
        const [rejectStatus, duplicateStatus] = await Promise.all([
            DefectStatus.findOne({ where: { defect_status_name: "Reject" } }),
            DefectStatus.findOne({ where: { defect_status_name: "Duplicate" } })
        ]);

        const [rejectedDefects, duplicateDefects] = await Promise.all([
            rejectStatus ? Defect.count({ where: { project_id: projectId, defect_status_id: rejectStatus.id } }) : 0,
            duplicateStatus ? Defect.count({ where: { project_id: projectId, defect_status_id: duplicateStatus.id } }) : 0
        ]);

        // Valid defects exclude rejected and duplicate
        const defectsCount = Math.max(0, remarksCount - (rejectedDefects + duplicateDefects));

        // No data case
        if (defectsCount === 0 && remarksCount === 0) {
            return {};
        }

        // Validation rule
        if (defectsCount > remarksCount) {
            const error = new Error('Defect count should not exceed remark count');
            error.code = 'INVALID_COUNTS';
            error.details = { defectsCount, remarksCount };
            throw error;
        }

        // Calculate ratio
        const ratioValue = remarksCount > 0 ? (defectsCount / remarksCount) * 100 : 0;
        const ratio = `${ratioValue.toFixed(2)}%`;

        // Categorize by thresholds
        let category, color;
        if (ratioValue > 98 && ratioValue <= 100) {
            category = 'Low';
            color = 'Green';
        } else if (ratioValue >= 90 && ratioValue <= 98) {
            category = 'Medium';
            color = 'Yellow';
        } else {
            category = 'High';
            color = 'Red';
        }

        return {
            remarksCount,
            defectsCount,
            ratio,
            category,
            color,
        };
    }
}

module.exports = new DashboardRepository();
