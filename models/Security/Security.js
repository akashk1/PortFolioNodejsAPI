const mongoose = require("mongoose");

const security = new mongoose.Schema({
  ticker_symbol: {
    type: String,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
    min: 0,
  },
  average_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = security;
