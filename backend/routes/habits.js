const express = require("express");
const router = express.Router();

const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
} = require("../controllers/habitController");

router.get("/", getHabits);

router.post("/", createHabit);

router.put("/:id", updateHabit);

router.delete("/:id", deleteHabit);

router.patch("/toggle/:id", toggleHabit);

module.exports = router;
