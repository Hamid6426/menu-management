// models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  brandColors: {
    primary: String,
    secondary: String
  },
  locations: [String],
  languages: [{
    type: String,
    enum: ['en', 'it', 'ar'],
    required: true
  }],
  menus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Admin who created the restaurant
  createdAt: { type: Date, default: Date.now }
});

restaurantSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);