const { Router } = require("express");
const {
  listAppointments,
  getAppointment,
  listAvailability,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment,
} = require("../controllers/appointmentsController");
const { requireAdmin } = require("../controllers/adminAuth");

const router = Router();

router.get("/availability", listAvailability);
router.post("/", createAppointment);
router.get("/", requireAdmin, listAppointments);
router.get("/:id", requireAdmin, getAppointment);
router.patch("/:id", requireAdmin, updateAppointmentStatus);
router.delete("/:id", requireAdmin, cancelAppointment);

module.exports = router;
