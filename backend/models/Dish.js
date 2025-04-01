const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dishSlug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  description: String,
  price: { type: Number, required: true },
  allergens: [String], // e.g., ["gluten", "nuts"]
  isEnabled: { type: Boolean, default: true }, // Admin can disable a dish
  image: { 
    type: Buffer, // Buffer to store image data
  },
  availability: {
    startTime: Number, // Minutes since midnight (0-1440)
    endTime: Number,
  },
  menuSlug: {
    type: String, // Store menuSlug instead of ObjectId
    ref: "Menu",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dish", dishSchema);
