// models/Menu.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  dishes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dish' 
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);