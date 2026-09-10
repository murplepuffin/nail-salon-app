const { Router } = require("express");
const {
  listServices,
  getService,
  createService,
} = require("../controllers/servicesController");
const { requireAdmin } = require("../controllers/adminAuth");

const router = Router();

router.get("/", listServices);
router.get("/:id", getService);
router.post("/", requireAdmin, createService);

module.exports = router;
