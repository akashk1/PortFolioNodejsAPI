const router = require("express").Router();
const tradeUtility = require("./tradeUtility");
const tradeValidator = require("./tradeValidator");
router.post(
  "/addTrade",
  tradeValidator.validate("addTrade"),
  tradeUtility.addTrade
);

router.get("/getAll", tradeUtility.getTrades);
router.put(
  "/update",
  tradeValidator.validate("updateTrade"),
  tradeUtility.updateTrade
);
router.get("/delete/:id", tradeUtility.deleteTrade);
router.get("/:id", tradeUtility.getTrade);
module.exports = router;
