// models/Analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  eventType: { 
    type: String, 
    enum: ['menu_view', 'dish_view', 'allergy_filter'], 
    required: true 
  },
  dish: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dish' 
  }, // Optional (for dish-specific events)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, // Optional (logged-in users)
  sessionId: String, // For anonymous users
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);