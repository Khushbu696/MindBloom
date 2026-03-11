const Habit = require("../models/Habit");

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // If already completed, do nothing
    if (habit.completed) {
      return res.json(habit);
    }

    habit.completed = true;
    habit.streak += 1;
    habit.lastCompleted = new Date();

    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetHabits = async () => {
  const habits = await Habit.find();

  const now = new Date();

  for (let habit of habits) {
    if (!habit.lastCompleted) continue;

    const diff = now - habit.lastCompleted;

    if (habit.type === "daily" && diff > 24 * 60 * 60 * 1000) {
      habit.completed = false;
    }

    if (habit.type === "weekly" && diff > 7 * 24 * 60 * 60 * 1000) {
      habit.completed = false;
    }

    await habit.save();
  }
};