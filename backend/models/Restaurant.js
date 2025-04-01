const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  restaurantSlug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  location: { type: String },
  logo: { type: Buffer },
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
  menus: [
    {
      type: String, // use menuSlug
      ref: "Menu",
    },
  ],
  createdBy: {
    type: String, // store username
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

restaurantSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Restaurant", restaurantSchema);
