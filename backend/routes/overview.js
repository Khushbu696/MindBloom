const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getOverviewStats } = require("../controllers/overviewController");

router.get("/", protect, getOverviewStats);

module.exports = router;
