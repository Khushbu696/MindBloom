const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { createMood, getMoods } = require("../controllers/moodController");

router.post("/", auth, createMood);
router.get("/", auth, getMoods);

module.exports = router;
