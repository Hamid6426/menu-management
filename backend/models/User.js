const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lowercase: true },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
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
      type: String,
      ref: "Restaurant",
    },
  ], // For Admins managing restaurants
  allergies: [
    {
      type: String,
      trim: true,
      enum: [
        "gluten", "dairy", "nuts", "peanuts", "tree nuts", "shellfish", "soy", "eggs", "fish", 
        "wheat", "sesame", "mustard", "celery", "lupin", "molluscs", "sulphites", "corn", "latex", 
        "kiwi", "banana", "avocado", "crustaceans", "peach", "plum", "apples", "cherries", 
        "almonds", "cashews", "pine nuts", "coconut", "poppy seeds", "sesame seeds", "papaya", "mango"     
      ],
    },
  ],
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
