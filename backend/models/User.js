const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["super-admin", "admin", "manager", "user"],
    default: "user",
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ], // For Admins managing restaurants
  allergies: [{ 
    type: String, 
    trim: true,
    enum: [
      'gluten', 'dairy', 'nuts', 'peanuts', 'tree nuts', 'shellfish', 'soy', 'eggs', 'fish', 
      'wheat', 'sesame', 'mustard', 'celery', 'lupin', 'molluscs', 'sulphites', 'corn', 
      'latex', 'kiwi', 'banana', 'avocado', 'crustaceans'
    ] // We have an option of others but its hard to make it work
  }], 
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
