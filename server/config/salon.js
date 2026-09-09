const BUSINESS_HOURS = {
  0: null,
  1: { open: "10:00", close: "18:00" },
  2: { open: "10:00", close: "18:00" },
  3: { open: "10:00", close: "18:00" },
  4: { open: "10:00", close: "18:00" },
  5: { open: "10:00", close: "18:00" },
  6: { open: "10:00", close: "17:00" },
};

const SLOT_MINUTES = 30;

function parseClock(clock) {
  const [hours, minutes] = clock.split(":").map(Number);
  return hours * 60 + minutes;
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function hoursForDate(date) {
  return BUSINESS_HOURS[date.getDay()];
}

function isOpenOn(date) {
  return Boolean(hoursForDate(date));
}

function openingWindow(date) {
  const hours = hoursForDate(date);
  if (!hours) return null;
  const day = startOfDay(date);
  return {
    open: addMinutes(day, parseClock(hours.open)),
    close: addMinutes(day, parseClock(hours.close)),
  };
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

module.exports = {
  SLOT_MINUTES,
  addMinutes,
  hoursForDate,
  isOpenOn,
  openingWindow,
  rangesOverlap,
  startOfDay,
};
