const { getModels } = require("../models");
const {
  SLOT_MINUTES,
  addMinutes,
  isOpenOn,
  openingWindow,
  rangesOverlap,
  startOfDay,
} = require("../config/salon");
const { asyncHandler, httpError, idOf } = require("./http");
const { findOrCreateClient } = require("./usersController");

async function hydrate(appointment) {
  const { Client, Technician, Service } = getModels();
  const [client, technician, service] = await Promise.all([
    Client.findById(idOf(appointment.client)),
    Technician.findById(idOf(appointment.technician)),
    Service.findById(idOf(appointment.service)),
  ]);
  return { ...appointment, client, technician, service };
}

async function conflictingAppointments(
  technicianId,
  startTime,
  endTime,
  ignoreId,
) {
  const { Appointment } = getModels();
  const existing = await Appointment.find({
    technician: technicianId,
    status: { $ne: "cancelled" },
  });
  return existing.filter((appointment) => {
    if (ignoreId && String(appointment._id) === String(ignoreId)) return false;
    return rangesOverlap(
      new Date(appointment.startTime),
      new Date(appointment.endTime),
      startTime,
      endTime,
    );
  });
}

function assertWithinHours(startTime, endTime) {
  if (!isOpenOn(startTime)) {
    throw httpError(400, "The salon is closed on that day");
  }
  const window = openingWindow(startTime);
  if (startTime < window.open || endTime > window.close) {
    throw httpError(400, "That time is outside salon hours");
  }
}

const listAppointments = asyncHandler(async (req, res) => {
  const { Appointment } = getModels();
  const filter = {};
  if (req.query.technicianId) filter.technician = req.query.technicianId;
  if (req.query.status) filter.status = req.query.status;
  let appointments = await Appointment.find(filter);
  if (req.query.date) {
    const day = startOfDay(new Date(`${req.query.date}T00:00:00`));
    if (Number.isNaN(day.getTime())) throw httpError(400, "Invalid date");
    const nextDay = addMinutes(day, 24 * 60);
    appointments = appointments.filter((appointment) => {
      const start = new Date(appointment.startTime);
      return start >= day && start < nextDay;
    });
  }
  const hydrated = await Promise.all(appointments.map(hydrate));
  hydrated.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );
  res.json(hydrated);
});

const getAppointment = asyncHandler(async (req, res) => {
  const { Appointment } = getModels();
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) throw httpError(404, "Appointment not found");
  res.json(await hydrate(appointment));
});

const listAvailability = asyncHandler(async (req, res) => {
  const { date, technicianId, serviceId } = req.query;
  if (!date) throw httpError(400, "date is required (YYYY-MM-DD)");
  const day = startOfDay(new Date(`${date}T00:00:00`));
  if (Number.isNaN(day.getTime())) throw httpError(400, "Invalid date");

  const { Service, Technician } = getModels();
  const service = serviceId ? await Service.findById(serviceId) : null;
  if (serviceId && !service) throw httpError(404, "Service not found");
  const durationMinutes = service ? service.durationMinutes : SLOT_MINUTES;

  const technicians = technicianId
    ? [await Technician.findById(technicianId)].filter(Boolean)
    : (await Technician.find({ active: true }));
  if (technicianId && technicians.length === 0) {
    throw httpError(404, "Technician not found");
  }

  const window = openingWindow(day);
  if (!window) {
    res.json({ date, open: false, slots: [] });
    return;
  }

  const slots = [];
  for (const technician of technicians) {
    let cursor = new Date(window.open);
    while (addMinutes(cursor, durationMinutes) <= window.close) {
      const startTime = new Date(cursor);
      const endTime = addMinutes(startTime, durationMinutes);
      const conflicts = await conflictingAppointments(
        technician._id,
        startTime,
        endTime,
      );
      if (conflicts.length === 0) {
        slots.push({
          technicianId: technician._id,
          technicianName: technician.name,
          startTime,
          endTime,
        });
      }
      cursor = addMinutes(cursor, SLOT_MINUTES);
    }
  }

  res.json({ date, open: true, durationMinutes, slots });
});

const createAppointment = asyncHandler(async (req, res) => {
  const {
    technicianId,
    serviceId,
    startTime: startInput,
    notes = "",
    clientId,
    client,
  } = req.body;

  if (!technicianId || !serviceId || !startInput) {
    throw httpError(400, "technicianId, serviceId, and startTime are required");
  }

  const { Technician, Service, Appointment } = getModels();
  const technician = await Technician.findById(technicianId);
  if (!technician || technician.active === false) {
    throw httpError(400, "Technician is not available");
  }
  const service = await Service.findById(serviceId);
  if (!service || service.bookable === false) {
    throw httpError(400, "Service is not bookable");
  }

  const startTime = new Date(startInput);
  if (Number.isNaN(startTime.getTime())) throw httpError(400, "Invalid startTime");
  const endTime = addMinutes(startTime, service.durationMinutes);
  assertWithinHours(startTime, endTime);

  const conflicts = await conflictingAppointments(
    technician._id,
    startTime,
    endTime,
  );
  if (conflicts.length) {
    throw httpError(409, "That technician is already booked for this time");
  }

  let savedClient;
  if (clientId) {
    const { Client } = getModels();
    savedClient = await Client.findById(clientId);
    if (!savedClient) throw httpError(404, "Client not found");
  } else if (client && client.email) {
    savedClient = await findOrCreateClient(client);
  } else {
    throw httpError(400, "clientId or client { name, email } is required");
  }

  const appointment = await Appointment.create({
    client: savedClient._id,
    technician: technician._id,
    service: service._id,
    startTime,
    endTime,
    status: "scheduled",
    notes,
  });

  res.status(201).json(await hydrate(appointment));
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["scheduled", "completed", "cancelled"].includes(status)) {
    throw httpError(400, "status must be scheduled, completed, or cancelled");
  }
  const { Appointment } = getModels();
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, {
    status,
  });
  if (!appointment) throw httpError(404, "Appointment not found");
  res.json(await hydrate(appointment));
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const { Appointment } = getModels();
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, {
    status: "cancelled",
  });
  if (!appointment) throw httpError(404, "Appointment not found");
  res.json(await hydrate(appointment));
});

module.exports = {
  listAppointments,
  getAppointment,
  listAvailability,
  createAppointment,
  updateAppointmentStatus,
  cancelAppointment,
};
