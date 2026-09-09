const { Router } = require("express");
const {
  listAppointments,
  getAppointment,
  listAvailability,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment,
} = require("../controllers/appointmentsController");

const router = Router();

router.get("/", listAppointments);
router.get("/availability", listAvailability);
router.get("/:id", getAppointment);
router.post("/", createAppointment);
router.patch("/:id", updateAppointmentStatus);
router.delete("/:id", cancelAppointment);

module.exports = router;
