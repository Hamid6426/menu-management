const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dishSlug: { type: String, required: true, trim: true, lowercase: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  isEnabled: { type: Boolean, default: true }, // Admin can disable a dish
  dishImage: { type: Buffer }, // Buffer to store image data
  availability: { startTime: Number, endTime: Number },  // Minutes since midnight (0-1440)
  menuSlug: { type: String, ref: "Menu", required: true },  // Store menuSlug instead of ObjectId
  allergens: [
    {
      type: String,
      trim: true,
      enum: [
        "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy",
        "eggs", "fish", "wheat", "sesame", "mustard", "celery", "lupin",
        "molluscs", "sulphites", "corn", "latex", "kiwi", "banana", "avocado",
        "crustaceans",
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Dish", dishSchema);
