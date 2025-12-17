require("dotenv").config();
const mongoose = require("mongoose");
const Reward = require("./models/Reward");
const connectDB = require("./config/db");

const rewards = [
    {
        title: "7-Day Streak",
        description: "Complete 7 consecutive days of mood logging",
        points: 50,                       // FIXED
        requirementType: "7_day_streak",  // FIXED
        requirementValue: 7,
        active: true
    },
    {
        title: "First Journal Entry",
        description: "Write your first journal entry",
        points: 25,
        requirementType: "first_journal",
        requirementValue: 1,
        active: true
    },
    {
        title: "Habit Master",
        description: "Maintain 3 habits for 14 days",
        points: 100,
        requirementType: "habit_master",
        requirementValue: 14,
        active: true
    },
    {
        title: "Community Contributor",
        description: "Create 10 community posts",
        points: 75,
        requirementType: "community_contributor",
        requirementValue: 10,
        active: true
    },
    {
        title: "30-Day Challenge",
        description: "Log your mood for 30 consecutive days",
        points: 200,
        requirementType: "30_day_streak",
        requirementValue: 30,
        active: true
    },
    {
        title: "Community Star",
        description: "Get 50 likes on your posts",
        points: 150,
        requirementType: "community_star",
        requirementValue: 50,
        active: true
    }
];

async function seed() {
    await connectDB();

    console.log("Clearing old rewards...");
    await Reward.deleteMany({});

    console.log("Inserting new rewards...");
    await Reward.insertMany(rewards);

    console.log("Rewards seeded successfully");
    process.exit();
}

seed();
