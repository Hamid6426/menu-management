// models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String, // For filtering (e.g., "Appetizers")
  allergens: [String], // e.g., ["gluten", "nuts"]
  isEnabled: { type: Boolean, default: true }, // Admin can disable
  availability: {
    startTime: Number, // Minutes since midnight (0-1440)
    endTime: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dish', dishSchema);