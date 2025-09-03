const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');

// Get defect density for a project
router.get('/defect-density/:projectId', DashboardController.getDefectDensity);

// Get defect severity index for a project
router.get('/defect-severity-index/:projectId', DashboardController.getDefectSeverityIndex);

// Get defect severity breakdown for a project
router.get('/defect-severity-breakdown/:projectId', DashboardController.getDefectSeverityBreakdown);

// Get defect summary by module for a project
router.get('/defect-summary-by-module/:projectId', DashboardController.getDefectSummaryByModule);

// Get defect type breakdown for a project
router.get('/defect-type-breakdown/:projectId', DashboardController.getDefectTypeBreakdown);

// Get remark ratio for a project
router.get('/remark-ratio/:projectId', DashboardController.getRemarkRatio);

module.exports = router;
