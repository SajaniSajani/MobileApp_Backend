const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controller');

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get project by ID
router.get('/:id', ProjectController.getProjectById);

// Create new project
router.post('/', ProjectController.createProject);

// Update project
router.put('/:id', ProjectController.updateProject);

// Delete project
router.delete('/:id', ProjectController.deleteProject);

// Get projects by status
router.get('/status/:status', ProjectController.getProjectsByStatus);

module.exports = router;
