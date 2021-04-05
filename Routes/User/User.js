const express = require("express");
const router = express.Router();
const userUtility = require("./userUtility");
const userValidator = require("./userValidator");

router.post(
  "/add",
  userValidator.validate("createUser"),
  userUtility.createUser
);
module.exports = router;
