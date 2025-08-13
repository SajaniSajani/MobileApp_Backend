const { Designation } = require('../models/designation');

exports.findAll = () => Designation.findAll();

exports.findById = (id) => Designation.findByPk(id);

exports.create = (data) => Designation.create(data);

exports.update = (id, data) =>
  Designation.update(data, { where: { id } });

exports.remove = (id) =>
  Designation.destroy({ where: { id } });
