const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    targetPerDay: { type: Number, default: 1 }, // e.g., minutes or count
    streak: { type: Number, default: 0 },
    lastCompleted: { type: Date },
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Habit', HabitSchema);
