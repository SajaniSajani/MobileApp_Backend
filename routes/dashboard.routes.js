const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');

// Get defect density for a project
router.get('/defect-density/:projectId', DashboardController.getDefectDensity);

module.exports = router;
