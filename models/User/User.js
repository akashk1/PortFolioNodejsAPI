const mongoose = require("mongoose");
const Security = require("../Security/Security");
// const { Security } = require(__dirname + "../Security/Security.js").schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
  },
  securities: [Security],
});

module.exports = mongoose.model("User", userSchema, "User");
