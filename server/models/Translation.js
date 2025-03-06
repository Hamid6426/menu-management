// models/Translation.js
const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: true, 
    unique: true 
  }, // e.g., "menu.title"
  values: {
    en: { type: String, required: true }, // English
    it: { type: String, required: true }, // Italian
    ar: { type: String, required: true }  // Arabic
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Translation', translationSchema);