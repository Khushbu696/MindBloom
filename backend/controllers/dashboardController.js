const MoodLog = require("../models/MoodLog");
const Habit = require("../models/Habit");
const Post = require("../models/Post");

exports.getDashboardData = async (req, res) => {
  try {
    const moods = await MoodLog.find().sort({ createdAt: -1 }).limit(7);

    const habits = await Habit.find();

    const postsCount = await Post.countDocuments();

    const completedToday = habits.filter((h) => h.completed).length;

    const maxStreak = Math.max(...habits.map((h) => h.streak), 0);

    const moodMap = {
      happy: { emoji: "😊", label: "Happy" },
      excited: { emoji: "🤩", label: "Excited" },
      calm: { emoji: "😌", label: "Calm" },
      sad: { emoji: "😢", label: "Sad" },
      anxious: { emoji: "😰", label: "Anxious" },
      angry: { emoji: "😠", label: "Angry" },
      tired: { emoji: "😴", label: "Tired" },
      neutral: { emoji: "😐", label: "Neutral" },
    };

    const latestMood = moods[0]
      ? moodMap[moods[0].mood]
      : { emoji: "🙂", label: "Neutral" };

    const moodData = moods.reverse().map((m) => ({
      day: new Date(m.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      emoji: moodMap[m.mood]?.emoji || "🙂",
      value: m.intensity,
    }));

    const todayHabits = habits.slice(0, 4);

    const achievements = [];

    if (moods.length >= 1)
      achievements.push({
        title: "First Step",
        description: "Logged your first mood",
        icon: "🌱",
        color: "#6FD89C",
      });

    if (maxStreak >= 7)
      achievements.push({
        title: "Week Warrior",
        description: "7 day streak",
        icon: "🔥",
        color: "#F5A962",
      });

    if (postsCount >= 1)
      achievements.push({
        title: "Community Voice",
        description: "Shared your thoughts",
        icon: "💬",
        color: "#7BA5D6",
      });

    const xp = moods.length * 10 + completedToday * 5 + postsCount * 20;
    const bloomPoints = xp * 2 + maxStreak * 10;

    res.json({
      latestMood,
      moodData,
      habits: todayHabits,
      completedToday,
      maxStreak,
      achievements,
      bloomPoints,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
