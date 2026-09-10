const express = require("express");
const cors = require("cors");
const { env } = require("./config/env");
const { connectDb, getDbMode } = require("./config/db");
const { seedIfEmpty } = require("./config/seed");
const api = require("./routes");

async function main() {
  const { port, clientOrigin, adminOrigin } = env();
  const app = express();
  const origins = [clientOrigin, adminOrigin].filter(Boolean);

  app.use(
    cors({
      origin: origins.length === 1 ? origins[0] : origins,
    }),
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true, db: getDbMode() });
  });

  app.use("/api", api);

  app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const message =
      status === 500 ? "Internal server error" : err.message || "Request failed";
    if (status === 500) console.error(err);
    res.status(status).json({ error: message });
  });

  const mode = await connectDb();
  await seedIfEmpty();

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port} (${mode})`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
