const repo = require('../repositories/designation.repository');

exports.getAllDesignations = () => repo.findAll();

exports.getDesignationById = (id) => repo.findById(id);

exports.createDesignation = (data) => repo.create(data);

exports.updateDesignation = (id, data) => repo.update(id, data);

exports.deleteDesignation = (id) => repo.remove(id);
