const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    priceCents: { type: Number, required: true, min: 0 },
    durationMinutes: { type: Number, required: true, min: 15 },
    bookable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
