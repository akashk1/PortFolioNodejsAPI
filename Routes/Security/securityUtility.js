const User = require("../../models/User/User");
const Trade = require("../Trade/TradeMethods");
exports.getPortfolio = async (req, res, next) => {
  const id = req.params.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
        success: false,
        errorMessage: "User not Found",
      });
    }
    return res.status(200).json({
      portfolio: user.securities,
      userName: user.name,
      success: true,
    });
  });
};

exports.getReturns = async (req, res, next) => {
  const id = req.params.id;
  const user = await Trade.getUser(id);
  const securities = user.securities;
  const currentPrice = 100;
  let totalReturn = 0;
  securities.forEach((security) => {
    totalReturn =
      totalReturn + (currentPrice - security.average_price) * security.shares;
  });

  return res.status(200).json({
    success: true,
    totalReturns: totalReturn,
  });
};
