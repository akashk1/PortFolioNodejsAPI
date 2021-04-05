const { body } = require("express-validator");
const { param } = require("../User/User");

exports.validate = (method) => {
  switch (method) {
    case "addTrade": {
      return [
        body("user_id", "user_id is required").exists(),
        body("trade_name", "trade_name is required").exists(),
        body("ticker_symbol", "ticker_symbol is required").exists(),
        body("type", "type is reuired").isIn(["Buy", "Sell"]).exists(),
        body("shares", "shares is required").isInt({ min: 1 }).exists(),
        body("trade_price", "trade_price is required")
          .isInt({ min: 1 })
          .exists(),
      ];
    }
    case "updateTrade": {
      return [
        body("ticker_symbol", "ticker_Symbol is required").exists(),
        body("shares", "shares is required").isInt({ min: 0 }).exists(),
        body("type", "type is reuired").isIn(["Buy", "Sell"]).exists(),
        body("trade_price", "trade_price is required")
          .isInt({ min: 1 })
          .exists(),
        body("trade_id", "trade_id is required").exists(),
      ];
    }
  }
};
