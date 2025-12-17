const MoodLog = require('../models/moodLog');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// local storage (for MVP). In prod replace with S3 or other cloud storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

exports.uploadVoice = upload.single('voiceNote'); // middleware to use in route

exports.createMood = async (req, res, next) => {
    try {
        const { moodScore, emotions = [], journal, title } = req.body;
        const mood = new MoodLog({
            user: req.user._id,
            moodScore,
            emotions: Array.isArray(emotions) ? emotions : [emotions],
            title
        });

        if (journal) mood.journal = journal; // virtual setter encrypts
        if (req.file) mood.voiceNotePath = req.file.path;

        await mood.save();

        const Activity = require('../models/Activity');

        await Activity.create({
            user: req.user._id,
            message: `Logged mood: ${mood.emotions[0] || "Mood Entry"}`,
            type: "mood"
        });

        // Basic gamification: award XP for logging mood
        const User = require('../models/User');
        const user = await User.findById(req.user._id);
        user.xp += 10;
        // level up check simple
        if (user.xp >= user.level * 100) {
            user.level += 1;
        }
        await user.save();

        res.status(201).json(mood);
    } catch (err) {
        next(err);
    }
};

exports.getMyMoods = async (req, res, next) => {
    try {
        const moods = await MoodLog.find({ user: req.user._id }).sort({ 'meta.createdAt': -1, createdAt: -1 });
        res.json(moods);
    } catch (err) {
        next(err);
    }
};

exports.deleteMood = async (req, res) => {
    try {
        const mood = await MoodLog.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!mood) {
            return res.status(404).json({ message: "Mood entry not found" });
        }

        await mood.deleteOne();

        res.json({ message: "Mood entry deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting entry" });
    }
};

