const { Router } = require("express");
const {
  listServices,
  getService,
  createService,
} = require("../controllers/servicesController");

const router = Router();

router.get("/", listServices);
router.get("/:id", getService);
router.post("/", createService);

module.exports = router;
