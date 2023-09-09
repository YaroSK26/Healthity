import mongoose, { Schema } from "mongoose";

const WeightSchema = new Schema(
  {
    weight: Number,
    date: String,
    userId: String || Object,
  },
  {
    timestamps: true,
  }
);

const Weight = mongoose.models.Weight || mongoose.model("Weight", WeightSchema);

export default Weight;
