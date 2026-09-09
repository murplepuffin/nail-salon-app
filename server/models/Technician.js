const mongoose = require("mongoose");
const { Schema } = mongoose;

const technicianSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, default: "" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Technician || mongoose.model("Technician", technicianSchema);
