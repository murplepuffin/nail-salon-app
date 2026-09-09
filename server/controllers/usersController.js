const { getModels } = require("../models");
const { asyncHandler, httpError } = require("./http");

const listUsers = asyncHandler(async (_req, res) => {
  const { Client } = getModels();
  const clients = await Client.find();
  clients.sort((a, b) => a.name.localeCompare(b.name));
  res.json(clients);
});

const getUser = asyncHandler(async (req, res) => {
  const { Client } = getModels();
  const client = await Client.findById(req.params.id);
  if (!client) throw httpError(404, "Client not found");
  res.json(client);
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, phone = "" } = req.body;
  if (!name || !email) throw httpError(400, "name and email are required");
  const { Client } = getModels();
  const existing = await Client.findOne({ email: String(email).toLowerCase() });
  if (existing) throw httpError(409, "A client with that email already exists");
  const client = await Client.create({
    name,
    email: String(email).toLowerCase(),
    phone,
  });
  res.status(201).json(client);
});

async function findOrCreateClient({ name, email, phone = "" }) {
  const { Client } = getModels();
  const normalized = String(email).toLowerCase();
  const existing = await Client.findOne({ email: normalized });
  if (existing) {
    const updates = {};
    if (name && existing.name !== name) updates.name = name;
    if (phone && existing.phone !== phone) updates.phone = phone;
    if (Object.keys(updates).length) {
      return Client.findByIdAndUpdate(existing._id, updates);
    }
    return existing;
  }
  if (!name) throw httpError(400, "name is required to create a client");
  return Client.create({ name, email: normalized, phone });
}

module.exports = { listUsers, getUser, createUser, findOrCreateClient };
