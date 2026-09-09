const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });

function env() {
  return {
    port: Number(process.env.PORT) || 4000,
    mongoUri: process.env.MONGODB_URI || "",
    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    timeZone: process.env.TZ || "America/New_York",
  };
}

module.exports = { env };
