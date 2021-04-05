const Trade = require("../../models/Trades/Trade");
const User = require("../../models/User/User");
const TradeMethods = require("./TradeMethods");

exports.addTrade = async (req, res, next) => {
  const userData = await TradeMethods.getUser(req.body_user_id);
  console.log("update");
  const user = userData;
  const security = TradeMethods.getSecurity(user, req);
  const tradingResponse = TradeMethods.sellAndBuyTrade(req, security, user);
  const { success } = tradingResponse;
  if (!success) {
    return res.status(400).json({
      success: false,
      errorMessage: "can not Trade ",
    });
  }

  await User.findOneAndUpdate(
    { _id: user["_id"] },
    tradingResponse.updatedUser,
    (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          errorMessage: "Some Server Error Occured",
        });
      }
      const trade = new Trade(req.body);
      return TradeMethods.saveTrade(trade, res);
    }
  );
};

exports.getTrade = async (req, res, next) => {
  const id = req.params.id;
  console.log("reaches", id);
  const trade = await TradeMethods.getTrade(id);
  return res.status(200).json({
    data: trade,
    success: true,
  });
};
exports.getTrades = (req, res, next) => {
  console.log("reached");
  User.aggregate([
    {
      $lookup: {
        localField: "_id",
        from: "Trade",
        foreignField: "user_id",
        as: "Trades",
      },
    },
  ]).exec((err, results) => {
    if (err) {
      return res.status(200).json({
        success: true,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      trades: results,
    });
  });
};

exports.updateTrade = async (req, res, next) => {
  const id = req.body.trade_id;

  const trade = await TradeMethods.getTrade(id);
  const user = await TradeMethods.getUser(trade.user_id);

  const tradingResponse = TradeMethods.updateSecurity(user, trade, req);

  const { success } = tradingResponse;
  if (!success) {
    return res.status(400).json({
      success: false,
      errorMessage: "Trade not found",
    });
  }

  await TradeMethods.updateUser(
    user._id,
    tradingResponse.updatedUser,
    req,
    res
  );
};

exports.deleteTrade = async (req, res, next) => {
  const id = req.params.id;
  const trade = await TradeMethods.getTrade(id);
  const user = await TradeMethods.getUser(trade.user_id);
  const tradingResponse = TradeMethods.RemoveTradeFromSecurity(user, trade);
  const { success } = tradingResponse;
  if (!success) {
    return res.status(400).json({
      success: false,
      errorMessage: "Trade not found",
    });
  }

  await User.findOneAndUpdate(
    { _id: user["_id"] },
    tradingResponse.updatedUser,
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          errorMessage: "Some Server Error Occured",
        });
      }
      const trade = await TradeMethods.deleteTrade(id);
      res.status(200).json({
        data: trade,
        success: true,
      });
    }
  );
};
