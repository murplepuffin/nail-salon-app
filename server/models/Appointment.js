const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
    },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

appointmentSchema.index({ technician: 1, startTime: 1, endTime: 1 });

module.exports =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
