const { Router } = require("express");
const {
  listUsers,
  getUser,
  createUser,
} = require("../controllers/usersController");
const { requireAdmin } = require("../controllers/adminAuth");

const router = Router();

router.get("/", requireAdmin, listUsers);
router.get("/:id", requireAdmin, getUser);
router.post("/", requireAdmin, createUser);

module.exports = router;
