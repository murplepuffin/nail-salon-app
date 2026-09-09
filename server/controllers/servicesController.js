const { getModels } = require("../models");
const { asyncHandler, httpError } = require("./http");

const listServices = asyncHandler(async (_req, res) => {
  const { Service } = getModels();
  const services = await Service.find();
  services.sort((a, b) => a.name.localeCompare(b.name));
  res.json(services);
});

const getService = asyncHandler(async (req, res) => {
  const { Service } = getModels();
  const service = await Service.findById(req.params.id);
  if (!service) throw httpError(404, "Service not found");
  res.json(service);
});

const createService = asyncHandler(async (req, res) => {
  const { name, slug, description = "", priceCents, durationMinutes, bookable = true } =
    req.body;
  if (!name || !slug || priceCents == null || durationMinutes == null) {
    throw httpError(
      400,
      "name, slug, priceCents, and durationMinutes are required",
    );
  }
  const { Service } = getModels();
  const existing = await Service.findOne({ slug: String(slug).toLowerCase() });
  if (existing) throw httpError(409, "A service with that slug already exists");
  const service = await Service.create({
    name,
    slug: String(slug).toLowerCase(),
    description,
    priceCents: Number(priceCents),
    durationMinutes: Number(durationMinutes),
    bookable: Boolean(bookable),
  });
  res.status(201).json(service);
});

module.exports = { listServices, getService, createService };
