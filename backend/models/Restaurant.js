const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    it: { type: String, default: "" },
    ar: { type: String, default: "" },
  },
  location: {
    en: { type: String },
    it: { type: String, default: "" },
    ar: { type: String, default: "" },
  },
  restaurantSlug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  brandColors: {
    primary: String,
    secondary: String,
    tertiary: String,
  },
  languages: [
    {
      type: String,
      enum: ["en", "it", "ar"],
      required: true,
    },
  ],
  dishes: [{ type: String, ref: "Dish" }], // use dishSlug
  restaurantLogo: { type: Buffer },
  createdBy: {
    type: String, // store username
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

restaurantSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Restaurant", restaurantSchema);
