// models/Restaurant.js
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ref to User model
    required: true,
  }, // Admin who created the restaurant
  createdAt: { type: Date, default: Date.now },
});

restaurantSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Restaurant", restaurantSchema);
