const mongoose = require('mongoose');

const quoteItemSchema = new mongoose.Schema({
  name: String,
  qty: mongoose.Schema.Types.Mixed,
  lockedPrice: Number,
  description: String,
  duration: String,
  simCardFee: Number,
  features: [String]
});

const quoteSchema = new mongoose.Schema({
  items: [quoteItemSchema],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);
