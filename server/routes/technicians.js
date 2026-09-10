const { Router } = require("express");
const {
  listTechnicians,
  getTechnician,
  createTechnician,
} = require("../controllers/techniciansController");
const { requireAdmin } = require("../controllers/adminAuth");

const router = Router();

router.get("/", listTechnicians);
router.get("/:id", getTechnician);
router.post("/", requireAdmin, createTechnician);

module.exports = router;
