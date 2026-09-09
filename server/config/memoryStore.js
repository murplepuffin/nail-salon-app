const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const dataDir = path.join(__dirname, "..", "data");
const storePath = path.join(dataDir, "store.json");

const collections = {
  services: [],
  technicians: [],
  clients: [],
  appointments: [],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function matches(doc, filter = {}) {
  return Object.entries(filter).every(([key, expected]) => {
    const actual = doc[key];
    if (expected && typeof expected === "object" && !Array.isArray(expected)) {
      if (expected.$ne !== undefined) return actual !== expected.$ne;
      if (expected.$lt !== undefined && !(actual < expected.$lt)) return false;
      if (expected.$gt !== undefined && !(actual > expected.$gt)) return false;
      if (expected.$lte !== undefined && !(actual <= expected.$lte)) return false;
      if (expected.$gte !== undefined && !(actual >= expected.$gte)) return false;
      return true;
    }
    return String(actual) === String(expected);
  });
}

function persist() {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(storePath, JSON.stringify(collections, null, 2));
}

function load() {
  if (!fs.existsSync(storePath)) return;
  const saved = JSON.parse(fs.readFileSync(storePath, "utf8"));
  for (const name of Object.keys(collections)) {
    collections[name] = saved[name] || [];
  }
}

function createCollection(name) {
  return {
    async create(data) {
      const now = new Date().toISOString();
      const doc = {
        ...data,
        _id: data._id || randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      collections[name].push(doc);
      persist();
      return clone(doc);
    },
    async find(filter = {}) {
      return clone(collections[name].filter((doc) => matches(doc, filter)));
    },
    async findOne(filter = {}) {
      const doc = collections[name].find((item) => matches(item, filter));
      return doc ? clone(doc) : null;
    },
    async findById(id) {
      const doc = collections[name].find((item) => String(item._id) === String(id));
      return doc ? clone(doc) : null;
    },
    async findByIdAndUpdate(id, update) {
      const doc = collections[name].find((item) => String(item._id) === String(id));
      if (!doc) return null;
      Object.assign(doc, update, { updatedAt: new Date().toISOString() });
      persist();
      return clone(doc);
    },
    async findByIdAndDelete(id) {
      const index = collections[name].findIndex(
        (item) => String(item._id) === String(id),
      );
      if (index === -1) return null;
      const [removed] = collections[name].splice(index, 1);
      persist();
      return clone(removed);
    },
    async countDocuments(filter = {}) {
      return collections[name].filter((doc) => matches(doc, filter)).length;
    },
  };
}

function getMemoryModels() {
  return {
    Service: createCollection("services"),
    Technician: createCollection("technicians"),
    Client: createCollection("clients"),
    Appointment: createCollection("appointments"),
  };
}

load();

module.exports = { getMemoryModels };
