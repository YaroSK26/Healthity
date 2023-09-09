import mongoose, { Schema } from "mongoose";

const WaterSchema = new Schema(
  {
    water: Number,
    date: String,
    userId: String || Object,
  },
  {
    timestamps: true,
  }
);

const Water = mongoose.models.Water || mongoose.model("Water", WaterSchema);

export default Water;
