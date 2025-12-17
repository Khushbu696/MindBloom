const Habit = require('../models/Habit');

exports.createHabit = async (req, res, next) => {
    try {
        const { title, description, targetPerDay } = req.body;
        const habit = await Habit.create({ user: req.user._id, title, description, targetPerDay });
        res.status(201).json(habit);
    } catch (err) {
        next(err);
    }
};

exports.completeHabit = async (req, res, next) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        const today = new Date();
        const last = habit.lastCompleted ? new Date(habit.lastCompleted) : null;

        // If lastCompleted is yesterday (within 24-48 hours), increment streak. If already completed today, ignore.
        const sameDay = last && last.toDateString() === today.toDateString();
        if (sameDay) {
            return res.status(200).json({ message: 'Already completed today', habit });
        }

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const wasYesterday = last && last.toDateString() === yesterday.toDateString();

        habit.lastCompleted = today;
        habit.streak = wasYesterday ? habit.streak + 1 : 1;
        await habit.save();

        const Activity = require('../models/Activity');

        await Activity.create({
            user: req.user._id,
            message: `Completed habit: ${habit.title}`,
            type: "habit"
        });

        await Activity.create({
            user: req.user._id,
            message: `Earned XP from habit completion`,
            type: "points"
        });

        // reward XP for completing habit
        const User = require('../models/User');
        const user = await User.findById(req.user._id);
        user.xp += 5 + Math.floor(habit.streak / 5);
        if (user.xp >= user.level * 100) user.level += 1;
        await user.save();

        res.json(habit);
    } catch (err) {
        next(err);
    }
};

exports.getHabits = async (req, res, next) => {
    try {
        const habits = await Habit.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(habits);
    } catch (err) {
        next(err);
    }
};

exports.updateHabit = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const habit = await Habit.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description },
            { new: true }
        );

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        res.json(habit);
    } catch (err) {
        next(err);
    }
};

exports.deleteHabit = async (req, res, next) => {
    try {
        const habit = await Habit.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        res.json({ message: "Habit deleted successfully" });
    } catch (err) {
        next(err);
    }
};
