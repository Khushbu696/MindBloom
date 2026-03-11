const MoodLog = require("../models/MoodLog");
const Habit = require("../models/Habit");
const Post = require("../models/Post");

exports.getRewardsData = async (req, res) => {
  try {
    const moodCount = await MoodLog.countDocuments();
    const postsCount = await Post.countDocuments();
    const habits = await Habit.find();

    const completedHabits = habits.filter((h) => h.completed).length;
    const maxStreak = Math.max(...habits.map((h) => h.streak), 0);

    const xp = moodCount * 10 + completedHabits * 5 + postsCount * 20;

    const level = Math.floor(xp / 100) + 1;

    const nextLevelXP = level * 100;

    const bloomPoints = xp * 2 + maxStreak * 10;

    const achievements = [
      {
        id: 1,
        title: "First Step",
        description: "Log your first mood",
        icon: "🌱",
        unlocked: moodCount >= 1,
        category: "mood",
        xp: 50,
        progress: moodCount,
        total: 1,
      },

      {
        id: 2,
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "🔥",
        unlocked: maxStreak >= 7,
        category: "streaks",
        xp: 100,
        progress: maxStreak,
        total: 7,
      },

      {
        id: 3,
        title: "Mood Master",
        description: "Log 30 mood entries",
        icon: "💭",
        unlocked: moodCount >= 30,
        category: "mood",
        xp: 150,
        progress: moodCount,
        total: 30,
      },

      {
        id: 4,
        title: "Habit Hero",
        description: "Complete all daily habits for 7 days",
        icon: "⭐",
        unlocked: maxStreak >= 7,
        category: "habits",
        xp: 200,
        progress: maxStreak,
        total: 7,
      },

      {
        id: 5,
        title: "Community Champion",
        description: "Make 10 posts",
        icon: "🤝",
        unlocked: postsCount >= 10,
        category: "community",
        xp: 150,
        progress: postsCount,
        total: 10,
      },
    ];

    res.json({
      userProgress: {
        level,
        currentXP: xp,
        nextLevelXP,
        bloomPoints,
      },
      achievements,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
