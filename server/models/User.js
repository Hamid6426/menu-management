const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['superadmin', 'admin', 'manager', 'user'], 
    default: 'user' 
  },
  restaurants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant' 
  }], // For Admins managing restaurants
  allergies: [String], // For Customers (optional)
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);