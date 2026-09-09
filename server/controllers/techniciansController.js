const { getModels } = require("../models");
const { asyncHandler, httpError } = require("./http");

const listTechnicians = asyncHandler(async (req, res) => {
  const { Technician } = getModels();
  const filter = req.query.active === "true" ? { active: true } : {};
  const technicians = await Technician.find(filter);
  technicians.sort((a, b) => a.name.localeCompare(b.name));
  res.json(technicians);
});

const getTechnician = asyncHandler(async (req, res) => {
  const { Technician } = getModels();
  const technician = await Technician.findById(req.params.id);
  if (!technician) throw httpError(404, "Technician not found");
  res.json(technician);
});

const createTechnician = asyncHandler(async (req, res) => {
  const { name, specialty = "", active = true } = req.body;
  if (!name) throw httpError(400, "name is required");
  const { Technician } = getModels();
  const technician = await Technician.create({
    name,
    specialty,
    active: Boolean(active),
  });
  res.status(201).json(technician);
});

module.exports = { listTechnicians, getTechnician, createTechnician };
