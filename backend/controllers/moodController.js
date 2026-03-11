const MoodLog = require("../models/MoodLog");

// Create Mood Log
exports.createMood = async (req, res) => {
  try {
    const { mood, intensity, note, tags } = req.body;

    const newMood = await MoodLog.create({
      user: req.user,
      mood,
      intensity,
      note,
      tags,
    });

    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Mood Logs
exports.getMoods = async (req, res) => {
  try {
    const moods = await MoodLog.find({ user: req.user })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
