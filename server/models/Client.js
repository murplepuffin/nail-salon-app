const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

clientSchema.index({ email: 1 }, { unique: true });

module.exports =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
