import mongoose, { Schema } from "mongoose";

const BloodPressureSchema = new Schema(
  {
    bloodPressureUp: Number,
    bloodPressureDown: Number,
    date: String,
    userId: String || Object,
  },
  {
    timestamps: true,
  }
);

const BloodPressure = mongoose.models.BloodPressure || mongoose.model("BloodPressure", BloodPressureSchema);

export default BloodPressure;
