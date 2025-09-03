const Defect = require('../models/defect');
const Project = require('../models/project');
const DefectStatus = require('../models/defect_status');
const Severity = require('../models/severity');
const Module = require('../models/modules');
const DefectType = require('../models/defect_type');
const { Sequelize } = require('sequelize');

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

    async getDefectSeverityIndex(projectId) {
        const severities = await Severity.findAll({ attributes: ['severity_name', 'weight'] });
        const severityWeights = {};
        severities.forEach(sev => severityWeights[sev.severity_name] = sev.weight);

        // Get total defects count
        const totalDefects = await Defect.count({ 
            where: { project_id: projectId } 
        });

        // Get valid defects (excluding rejected and duplicate)
        const [rejectStatus, duplicateStatus] = await Promise.all([
            DefectStatus.findOne({ where: { defect_status_name: "Reject" } }),
            DefectStatus.findOne({ where: { defect_status_name: "Duplicate" } })
        ]);

        const [rejectedDefects, duplicateDefects] = await Promise.all([
            rejectStatus ? Defect.count({ where: { project_id: projectId, defect_status_id: rejectStatus.id } }) : 0,
            duplicateStatus ? Defect.count({ where: { project_id: projectId, defect_status_id: duplicateStatus.id } }) : 0
        ]);

        const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

        const validDefectsArr = await Defect.findAll({
            where: { project_id: projectId },
            include: [
                { model: Severity, attributes: ['severity_name'] },
                { model: DefectStatus, attributes: ['defect_status_name'] }
            ]
        });

        const filteredValidDefects = validDefectsArr.filter(
            d => d.defectstatus?.defect_status_name !== 'Reject' &&
                 d.defectstatus?.defect_status_name !== 'Duplicate'
        );

        const defectCounts = {};
        filteredValidDefects.forEach(d => {
            const sev = d.severity?.severity_name;
            if (sev) defectCounts[sev] = (defectCounts[sev] || 0) + 1;
        });

        let actualSeverityScore = 0, maxWeight = 0;
        Object.keys(severityWeights).forEach(sev => {
            const count = defectCounts[sev] || 0;
            const weight = severityWeights[sev];
            const score = count * weight;
            actualSeverityScore += score;
            if (weight > maxWeight) maxWeight = weight;
        });

        const maximumSeverityScore = validDefects * maxWeight;
        const dsiPercentage = maximumSeverityScore > 0
            ? parseFloat(((actualSeverityScore / maximumSeverityScore) * 100).toFixed(6))
            : 0.0;

        let interpretation = "";
        if (dsiPercentage <= 30) interpretation = "Low risk";
        else if (dsiPercentage <= 50) interpretation = "Moderate risk";
        else interpretation = "Significant risk";

        return {
            status: "Success",
            message: "DSI calculated successfully",
            data: {
                projectId,
                totalDefects,
                actualSeverityScore,
                maximumSeverityScore,
                dsiPercentage,
                interpretation,
                validDefects
            },
            statusCode: 2000
        };
    }

    async getDefectSeverityBreakdown(projectId) {
        // Validate project
        const project = await Project.findByPk(projectId, {
            attributes: ['id', 'project_name']
        });
        if (!project) {
            throw new Error(`Project not found with ID: ${projectId}`);
        }

        // Load all severities
        const severities = await Severity.findAll({
            attributes: ['id', 'severity_name', 'severity_color'],
            order: [['weight', 'DESC']]
        });

        // Load all statuses and their colors from the database
        const allStatuses = await DefectStatus.findAll({ attributes: ['id', 'defect_status_name', 'color_code'] });
        const statuses = allStatuses.map(st => st.defect_status_name);
        const statusIdToName = {};
        const statusNameToColor = {};
        allStatuses.forEach(st => {
            statusIdToName[st.id] = st.defect_status_name;
            statusNameToColor[st.defect_status_name] = st.color_code || null;
        });

        // Total defects for project
        const totalDefects = await Defect.count({ where: { project_id: projectId } });

        // Resolve status IDs for Reject and Duplicate
        const [rejectStatus, duplicateStatus] = await Promise.all([
            DefectStatus.findOne({ where: { defect_status_name: 'Reject' }, attributes: ['id'] }),
            DefectStatus.findOne({ where: { defect_status_name: 'Duplicate' }, attributes: ['id'] })
        ]);

        // Fetch valid defects (exclude Reject and Duplicate)
        const validDefects = await Defect.findAll({
            attributes: ['id', 'severity_id', 'defect_status_id'],
            where: { project_id: projectId },
            include: [{
                model: DefectStatus,
                attributes: ['defect_status_name'],
                where: {
                    defect_status_name: { [Sequelize.Op.notIn]: ['Reject', 'Duplicate'] }
                }
            }],
            raw: true
        });

        // Build breakdown by severity and status
        const severityMap = {};
        severities.forEach(s => {
            severityMap[s.id] = {
                severity: s.severity_name,
                Severity_color: s.severity_color,
                total: 0,
                statuses: {}
            };
            statuses.forEach(st => {
                severityMap[s.id].statuses[st] = { count: 0, color: statusNameToColor[st] };
            });
        });

        validDefects.forEach(d => {
            const sid = d.severity_id;
            const stid = d.defect_status_id;
            const stName = statusIdToName[stid];
            if (sid && severityMap[sid] && statuses.includes(stName)) {
                severityMap[sid].total += 1;
                severityMap[sid].statuses[stName].count += 1;
            }
        });

        // Format defectSummary for response
        const defectSummary = Object.values(severityMap).map(item => {
            // Flatten statuses to { status: count, color }
            const statusesObj = {};
            statuses.forEach(st => {
                statusesObj[st] = item.statuses[st].count;
                statusesObj[`${st}_color`] = item.statuses[st].color;
            });
            return {
                severity: item.severity,
                Severity_color: item.Severity_color,
                total: item.total,
                statuses: statusesObj
            };
        });

        return {
            status: "success",
            statusCode: 2000,
            projectId: project.id,
            projectName: project.project_name,
            totalDefects,
            defectSummary
        };
    }

    async getDefectSummaryByModule(projectId) {
        // Validate project exists
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error(`Project not found with ID: ${projectId}`);
        }

        // Get defect summary grouped by module
        const defectSummary = await Defect.findAll({
            attributes: [
                [Sequelize.col("Module.id"), "moduleId"],
                [Sequelize.col("Module.module_name"), "name"],
                [Sequelize.fn("COUNT", Sequelize.col("Defect.id")), "value"]
            ],
            include: [
                {
                    model: Module,
                    attributes: []
                }
            ],
            where: { project_id: projectId },
            group: ["Module.id", "Module.module_name"],
            raw: true
        });

        const totalDefects = defectSummary.reduce((sum, item) => sum + parseInt(item.value), 0);

        // Calculate percentage for each module
        const data = defectSummary.map(item => ({
            moduleId: item.moduleId,
            name: item.name,
            value: parseInt(item.value),
            percentage: totalDefects > 0 ? parseFloat(((item.value / totalDefects) * 100).toFixed(2)) : 0
        }));

        return {
            status: "success",
            message: "Defect summary fetched successfully",
            data,
            statusCode: 2000
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

    async getDefectTypeBreakdown(projectId) {
        // Validate project
        const project = await Project.findByPk(projectId, {
            attributes: ['id', 'project_name', 'project_status']
        });
        if (!project) {
            throw new Error(`Project not found with ID: ${projectId}`);
        }

        // Load all defect types so we can include zero-count types
        const defectTypes = await DefectType.findAll({
            attributes: ['id', 'defect_type_name'],
            order: [['defect_type_name', 'ASC']]
        });

        // Resolve status IDs for Reject and Duplicate
        const [rejectStatus, duplicateStatus] = await Promise.all([
            DefectStatus.findOne({ where: { defect_status_name: 'Reject' }, attributes: ['id'] }),
            DefectStatus.findOne({ where: { defect_status_name: 'Duplicate' }, attributes: ['id'] })
        ]);

        // Fetch valid defects (exclude Reject and Duplicate)
        const validDefects = await Defect.findAll({
            attributes: ['id', 'type_id'],
            where: { project_id: projectId },
            include: [{
                model: DefectStatus,
                attributes: ['defect_status_name'],
                where: {
                    defect_status_name: { [Sequelize.Op.notIn]: ['Reject', 'Duplicate'] }
                }
            }],
            raw: true
        });

        // Count valid defects by type_id
        const typeIdToCount = {};
        validDefects.forEach(d => {
            const tid = d.type_id;
            if (!tid) return;
            typeIdToCount[tid] = (typeIdToCount[tid] || 0) + 1;
        });

        // Build defectTypes array for response
        const defectTypesArr = defectTypes.map(t => ({
            defectType: t.defect_type_name,
            defectCount: typeIdToCount[t.id] || 0
        }));

        const totalDefectCount = defectTypesArr.reduce((sum, item) => sum + item.defectCount, 0);

        // Add percentage for each type
        defectTypesArr.forEach(item => {
            item.percentage = totalDefectCount > 0 ? parseFloat(((item.defectCount / totalDefectCount) * 100).toFixed(2)) : 0;
        });

        // Find most common defect type
        let mostCommonDefectType = null;
        let mostCommonDefectCount = 0;
        defectTypesArr.forEach(item => {
            if (item.defectCount > mostCommonDefectCount) {
                mostCommonDefectType = item.defectType;
                mostCommonDefectCount = item.defectCount;
            }
        });

        return {
            status: "success",
            message: "Defect statistics fetched successfully",
            data: {
                defectTypes: defectTypesArr,
                totalDefectCount,
                mostCommonDefectType,
                mostCommonDefectCount
            },
            statusCode: 2000
        };
    }
}

module.exports = new DashboardRepository();
