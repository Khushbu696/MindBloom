const MoodLog = require("../models/moodLog");
const Habit = require("../models/Habit");
const User = require("../models/User");
const Activity = require("../models/Activity");

exports.getOverviewStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // mood logs count
        const moodLogsCount = await MoodLog.countDocuments({ user: userId });

        // active habits count
        const activeHabits = await Habit.countDocuments({ user: userId, active: true });

        // current streak = highest streak among user's habits
        const habits = await Habit.find({ user: userId });
        const currentStreak = habits.length > 0
            ? Math.max(...habits.map(h => h.streak))
            : 0;

        // total points from user.xp
        const user = await User.findById(userId);
        const totalPoints = user.xp || 0;

        // last 5 activities
        const recentActivities = await Activity.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                moodLogs: moodLogsCount,
                activeHabits,
                currentStreak,
                totalPoints
            },
            recentActivities
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching overview" });
    }
};
