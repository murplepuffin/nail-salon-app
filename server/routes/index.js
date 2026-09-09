const { Router } = require("express");
const appointments = require("./appointments");
const services = require("./services");
const technicians = require("./technicians");
const users = require("./users");

const router = Router();

router.use("/appointments", appointments);
router.use("/services", services);
router.use("/technicians", technicians);
router.use("/users", users);
router.use("/clients", users);

module.exports = router;
