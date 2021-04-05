const mongoose = require("mongoose");
const tradeSchema = new mongoose.Schema({
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  trade_name: {
    type: String,
    required: true,
  },
  ticker_symbol: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Buy", "Sell"],
  },
  shares: {
    type: Number,
    required: true,
    min: 0,
  },
  trade_price: {
    type: Number,
    default: 0,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trade", tradeSchema, "Trade");
