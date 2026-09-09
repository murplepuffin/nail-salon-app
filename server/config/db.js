const mongoose = require("mongoose");
const { env } = require("./env");

let mode = "memory";

async function connectDb() {
  const { mongoUri } = env();
  if (!mongoUri.startsWith("mongodb")) {
    mode = "memory";
    return mode;
  }

  try {
    await mongoose.connect(mongoUri);
    mode = "mongo";
    return mode;
  } catch (error) {
    console.warn(
      `MongoDB unavailable (${error.message}). Using local JSON store.`,
    );
    mode = "memory";
    return mode;
  }
}

function getDbMode() {
  return mode;
}

module.exports = { connectDb, getDbMode };
