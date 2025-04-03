const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      it: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    description: {
      en: { type: String, required: true },
      it: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    dishSlug: { type: String, required: true, trim: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },
    kilocalories: { type: Number, min: 0 },
    isEnabled: { type: Boolean, default: true },
    dishImage: { type: Buffer },
    availability: { startTime: Number, endTime: Number },
    restaurantSlug: { type: String, ref: "Restaurant", required: true },
    category: {
      type: String,
      enum: ["Starter", "Main Course", "Dessert", "Beverage", "Side Dish", "Special"],
      required: true,
    },
    allergens: {
      type: [String],
      trim: true,
      required: true,
      enum: [
        "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs", "fish", 
        "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites", "corn", "latex", 
        "kiwi", "banana", "avocado", "crustaceans", "peach", "plum", "apples", "cherries", 
        "almonds", "cashews", "pine nuts", "coconut", "poppy seeds", "sesame seeds", "papaya", "mango"
      ],
    },
    createdBy: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

dishSchema.index({ dishSlug: 1, restaurantSlug: 1 }, { unique: true });

module.exports = mongoose.model("Dish", dishSchema);
