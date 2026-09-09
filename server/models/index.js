const mongoose = require("mongoose");
const { getMemoryModels } = require("../config/memoryStore");

require("./Service");
require("./Technician");
require("./Client");
require("./Appointment");

function lean(doc) {
  if (!doc) return null;
  return typeof doc.toObject === "function" ? doc.toObject() : doc;
}

function wrapMongo(model) {
  return {
    create: async (data) => lean(await model.create(data)),
    find: async (filter = {}) => {
      const docs = await model.find(filter).lean();
      return docs;
    },
    findOne: async (filter = {}) => model.findOne(filter).lean(),
    findById: async (id) => model.findById(id).lean(),
    findByIdAndUpdate: async (id, update) =>
      model.findByIdAndUpdate(id, update, { new: true }).lean(),
    findByIdAndDelete: async (id) => model.findByIdAndDelete(id).lean(),
    countDocuments: async (filter = {}) => model.countDocuments(filter),
  };
}

function getModels() {
  if (mongoose.connection.readyState === 1) {
    return {
      Service: wrapMongo(mongoose.model("Service")),
      Technician: wrapMongo(mongoose.model("Technician")),
      Client: wrapMongo(mongoose.model("Client")),
      Appointment: wrapMongo(mongoose.model("Appointment")),
    };
  }
  return getMemoryModels();
}

module.exports = { getModels };
