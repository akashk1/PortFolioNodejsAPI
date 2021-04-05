const { body } = require("express-validator");
const { param } = require("../User/User");

exports.validate = (method) => {
  switch (method) {
    case "addTrade": {
      return [
        body("user_id", "user_id is required").exists(),
        body("trade_name", "trade_name is required").exists(),
        body("ticker_symbol", "ticker_symbol is required").exists(),
        body("type", "type is reuired").isIn(["Buy", "Sell"]),
        body("shares", "shares is required").isInt({ min: 1 }),
        body("trade_price", "trade_price is required").isInt({ min: 1 }),
      ];
    }
  }
};
