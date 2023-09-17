import mongoose, { Schema } from "mongoose";

const JournalSchema = new Schema(
  {
    theme: String,
    journal: String,
    problem: String,
    result : String,
    date: String,
    userId: String || Object,
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.models.Journal || mongoose.model("Journal", JournalSchema);

export default Journal;
