const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });

function env() {
  return {
    port: Number(process.env.PORT) || 4000,
    mongoUri: process.env.MONGODB_URI || "",
    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    adminOrigin: process.env.ADMIN_ORIGIN || "http://localhost:3001",
    adminKey: process.env.ADMIN_KEY || "",
    timeZone: process.env.TZ || "America/New_York",
  };
}

module.exports = { env };
