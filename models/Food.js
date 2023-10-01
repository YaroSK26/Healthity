import mongoose, { Schema } from "mongoose";

const FoodSchema = new Schema(
  {
    title: String,
    date: String,
    userId: String || Object,
    foodId: String || Object,
    quantity: Number,
    option: String,
    time: String || Object,
    kcal: Number,
    protein: Number,
    carbs: Number,
    fat : Number,
    roughage : Number,
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.models.Food || mongoose.model("Food", FoodSchema);

export default Food;
