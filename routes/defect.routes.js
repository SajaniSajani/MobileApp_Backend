const express = require('express');
const router = express.Router();
const DefectController = require('../controllers/defect.controller');

// Get all defects
router.get('/', DefectController.getAllDefects);

// Get defect by ID
router.get('/:id', DefectController.getDefectById);

// Create new defect
router.post('/', DefectController.createDefect);

// Update defect
router.put('/:id', DefectController.updateDefect);

// Delete defect
router.delete('/:id', DefectController.deleteDefect);

// Get defects by status
router.get('/status/:statusId', DefectController.getDefectsByStatus);

// Get defects by project
router.get('/project/:projectId', DefectController.getDefectsByProject);

// Get defects by assigned to user
router.get('/assigned-to/:userId', DefectController.getDefectsByAssignedTo);

// Get defects by priority
router.get('/priority/:priorityId', DefectController.getDefectsByPriority);

// Get defects by severity
router.get('/severity/:severityId', DefectController.getDefectsBySeverity);

module.exports = router;
