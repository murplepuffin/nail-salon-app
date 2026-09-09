const { Router } = require("express");
const {
  listTechnicians,
  getTechnician,
  createTechnician,
} = require("../controllers/techniciansController");

const router = Router();

router.get("/", listTechnicians);
router.get("/:id", getTechnician);
router.post("/", createTechnician);

module.exports = router;
