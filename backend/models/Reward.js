const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    points: { type: Number, required: true }, // XP reward
    requirementType: {
        type: String,
        enum: [
            "7_day_streak",
            "first_journal",
            "habit_master",
            "community_contributor",
            "30_day_streak",
            "community_star"
        ],
        required: true
    },
    requirementValue: { type: Number, default: 0 }, // e.g. 7, 1, 50 etc.
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Reward", RewardSchema);
