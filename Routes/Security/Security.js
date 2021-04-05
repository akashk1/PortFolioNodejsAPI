const router = require("express").Router();
const securityUtility = require("./securityUtility");

router.get("/getPortfolio/:id", securityUtility.getPortfolio);
router.get("/getReturn/:id", securityUtility.getReturns);
module.exports = router;
