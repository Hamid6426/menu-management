const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["Starter", "Main Course", "Dessert", "Beverage", "Side Dish", "Special"],
    required: true,
  },
  menuImage: { type: Buffer },
  menuSlug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  restaurantSlug: { 
    type: String, // Store restaurantSlug
    ref: "Restaurant",
    required: true,
  },
  dishes: [
    {
      type: String, // Store dishSlug
      ref: "Dish",
    },
  ],
  createdBy: {
    type: String, // store username 
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Menu", menuSchema);
