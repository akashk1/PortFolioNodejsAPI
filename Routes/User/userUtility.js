const User = require("../../models/User/User");

exports.createUser = (req, res, next) => {
  const user = new User({
    name: req.body.name,
  });
  user.save((err, result) => {
    if (err) {
      return res.status(404).json({
        title: "An error occured",
        error: err.errors,
        success: false,
      });
    }
    return res.status(200).json({
      data: result,
      success: true,
    });
  });
};
