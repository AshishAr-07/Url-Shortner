import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], 
  },
  { timestamps: true }
);

export const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);
