// models/Dish.js
const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  allergens: [String], // e.g., ["gluten", "nuts"]
  isEnabled: { type: Boolean, default: true }, // Admin can disable a dish i.e. not show it in the menu
  image: { 
    type: Buffer,  // Buffer to store image data
    // Optionally, you could add a contentType field if needed:
    // contentType: String
  },
  availability: {
    startTime: Number, // Minutes since midnight (0-1440)
    endTime: Number,
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dish", dishSchema);
