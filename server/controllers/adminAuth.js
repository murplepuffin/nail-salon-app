const { env } = require("../config/env");
const { httpError } = require("./http");

function requireAdmin(req, _res, next) {
  const { adminKey } = env();
  if (!adminKey) {
    next();
    return;
  }
  const provided = req.get("x-admin-key") || "";
  if (provided !== adminKey) {
    next(httpError(401, "Admin authorization required"));
    return;
  }
  next();
}

module.exports = { requireAdmin };
