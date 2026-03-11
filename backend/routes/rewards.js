const express = require("express");
const router = express.Router();

const { getRewardsData } = require("../controllers/rewardController");

router.get("/", getRewardsData);

module.exports = router;
