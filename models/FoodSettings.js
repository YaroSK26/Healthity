import mongoose, { Schema } from "mongoose";

const FoodSettingsSchema = new Schema(
  {
    sum: Number,
    protein: Number,
    fat: Number,
    roughage: Number,
    carbs: Number,
    userId: String || Object,
  },
  {
    timestamps: true,
  }
);

const FoodSettings = mongoose.models.FoodSettings || mongoose.model("FoodSettings", FoodSettingsSchema);

export default FoodSettings;
