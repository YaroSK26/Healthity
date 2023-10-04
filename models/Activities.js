import mongoose, { Schema } from "mongoose";

const ActivitiesSchema = new Schema(
  {
    title: String,
    date: String,
    userId: String || Object,
    ActivityId: String || Object,
    quantity: Number,
    option: Number || String,
    kcal: Number,
  },
  {
    timestamps: true,
  }
);

const Activities = mongoose.models.Activities || mongoose.model("Activities", ActivitiesSchema);

export default Activities;
