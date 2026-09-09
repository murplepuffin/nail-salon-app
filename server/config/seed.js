const { getModels } = require("../models");

const defaultServices = [
  {
    name: "SNS Manicure",
    slug: "sns-manicure",
    description:
      "Dip powder nail technique with a resin base and colored powder for a durable finish without UV light.",
    priceCents: 5800,
    durationMinutes: 75,
    bookable: true,
  },
  {
    name: "Gel Manicure",
    slug: "gel-manicure",
    description: "Long-lasting, premium non-toxic gel polish manicure.",
    priceCents: 4200,
    durationMinutes: 60,
    bookable: true,
  },
  {
    name: "Acrylic Manicure",
    slug: "acrylic-manicure",
    description: "Long-lasting acrylic overlay and polish.",
    priceCents: 5800,
    durationMinutes: 90,
    bookable: true,
  },
  {
    name: "Signature Pedicure",
    slug: "signature-pedicure",
    description:
      "Exfoliating scrub, hydrating mask, extended massage, and meticulous polish.",
    priceCents: 5000,
    durationMinutes: 60,
    bookable: true,
  },
  {
    name: "Thai Massage",
    slug: "thai-massage",
    description:
      "Acupressure, Ayurvedic principles, and assisted yoga-like stretches.",
    priceCents: 5500,
    durationMinutes: 60,
    bookable: true,
  },
];

const defaultTechnicians = [
  { name: "Mai Nguyen", specialty: "Gel and SNS", active: true },
  { name: "Linh Tran", specialty: "Acrylic and pedicure", active: true },
];

async function seedIfEmpty() {
  const { Service, Technician } = getModels();
  if ((await Service.countDocuments()) === 0) {
    for (const service of defaultServices) {
      await Service.create(service);
    }
  }
  if ((await Technician.countDocuments()) === 0) {
    for (const technician of defaultTechnicians) {
      await Technician.create(technician);
    }
  }
}

module.exports = { seedIfEmpty };
