const User = require("../../models/User/User");
const Trade = require("../../models/Trades/Trade");
exports.getSecurity = (user, req) => {
  // console.log(user, 3);
  const securities = user.securities;
  const requiredSecurities = securities.map(
    (security) => security.ticker_symbol === req.body.ticker_symbol
  );
  return requiredSecurities || [];
};
exports.getUser = async (id) => {
  return await User.findOne({ _id: id });
};

const sell = (user, req, obj) => {
  let oldShares = 0;
  let oldAveragePrice = 0;
  if ("shares" in obj) oldShares = obj.shares;
  if ("average_price" in obj) oldAveragePrice = obj.average_price;
  const updatedSecurities = user.securities;
  updatedSecurities.map((security) => {
    if (security.ticker_symbol === req.body.ticker_symbol) {
      const newShares = security.shares - req.body.shares + oldShares;
      const updatedAveragePrice =
        (security.shares * security.average_price -
          req.body.shares * req.body.trade_price +
          oldShares * oldAveragePrice) /
        newShares;

      security.shares = newShares;
      security.average_price = updatedAveragePrice;
      console.log(updatedSecurities, newShares, updatedAveragePrice);
    }
  });
  user.securities = updatedSecurities;
  return user;
};

const addSecurities = (user, req) => {
  const security = {
    ticker_symbol: req.body.ticker_symbol,
    shares: req.body.shares,
    average_price: req.body.trade_price,
  };
  const security1 = user.securities;
  security1.push(security);
  user.securities = security1;
  return user;
};

const buy = (user, req, obj) => {
  let oldShares = 0;
  let oldAveragePrice = 0;
  if ("shares" in obj) oldShares = obj.shares;
  if ("trade_price" in obj) oldAveragePrice = obj.trade_price;
  const securities = user.securities;
  // console.log(obj, oldShares, oldAveragePrice, 52);

  securities.forEach((security) => {
    if (security.ticker_symbol === req.body.ticker_symbol) {
      const newShares = security.shares + req.body.shares - oldShares;
      const newAveragePrice =
        (security.shares * security.average_price +
          req.body.shares * req.body.trade_price -
          oldShares * oldAveragePrice) /
        newShares;

      security.shares = newShares;
      security.average_price = newAveragePrice;
    }
  });
  user.securities = securities;
  return user;
};

exports.sellAndBuyTrade = (req, security, user) => {
  const id = user.securities.findIndex((s) => {
    return s.ticker_symbol === req.body.ticker_symbol;
  });
  console.log(id);
  if (req.body.type === "Sell" && id === -1) {
    return {
      success: false,
      errorMessage: "quantity should be +ve not -ve",
    };
  }
  if (req.body.type === "Sell" && security.shares < req.body.shares) {
    return {
      success: false,
      errorMessage: "Request share should be less than current shares",
    };
  }
  let updatedUser;
  if (req.body.type === "Sell") {
    updatedUser = sell(user, req, {});
  } else if (req.body.type === "Buy" && security.length < 1) {
    updatedUser = addSecurities(user, req);
  } else if (req.body.type === "Buy") {
    updatedUser = buy(user, req, {});
  }

  return {
    success: true,
    updatedUser: updatedUser,
  };
};
exports.saveTrade = (trade, res) => {
  trade.save((err, result) => {
    if (err) {
      return res.status(404).json({
        title: "An error occured",
        error: err,
        success: false,
      });
    }
    return res.status(200).json({
      data: result,
      success: true,
    });
  });
};
exports.getTrade = async (id) => await Trade.findById(id);

const updateTrade = async (req) => {
  return await Trade.findByIdAndUpdate(req.body.trade_id, req.body);
};

exports.updateSecurity = (user, oldTrade, req) => {
  const NewTrade = req.body;
  const id = user.securities.findIndex((s) => {
    return s.ticker_symbol === req.body.ticker_symbol;
  });

  // console.log(oldTrade, 134);
  if (id === -1) {
    return {
      success: false,
      errorMessage: "quantity should be +ve not -ve",
    };
  }
  if (req.body.type === "Sell" && security.shares < req.body.shares) {
    return {
      success: false,
      errorMessage: "Request share should be less than current shares",
    };
  }
  let updatedUser;
  if (NewTrade.type === "Buy") {
    updatedUser = buy(user, req, oldTrade);
  } else if (NewTrade.type === "Sell") {
    updatedUser = sell(user, req, oldTrade);
  }

  return {
    updatedUser: updatedUser,
    success: true,
  };
};

exports.RemoveTradeFromSecurity = (user, trade) => {
  const dummyReq = {
    body: {
      ticker_symbol: trade.ticker_symbol,
      shares: 0,
      trade_price: 0,
    },
  };
  let updatedUser;
  if (trade.type === "Buy") updatedUser = buy(user, dummyReq, trade);
  else if (trade.type === "Sell") updatedUser = sell(user, dummyReq, trade);

  return {
    success: true,
    updatedUser: updatedUser,
  };
};

exports.deleteTrade = async (id) => await Trade.findByIdAndDelete(id);

exports.updateUser = async (id, updatedUser, req, res) => {
  User.findOneAndUpdate({ _id: id }, updatedUser, async (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        errorMessage: "Some Server Error Occured",
      });
    }
    const trade = await updateTrade(req);
    res.status(200).json({
      data: req.body,
      success: true,
    });
  });
};
