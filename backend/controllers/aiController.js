const { analyzeJournal } = require('../utils/aiService');
const MoodLog = require('../models/moodLog');

exports.analyzeLatestJournal = async (req, res, next) => {
    try {
        const mood = await MoodLog.findOne({ user: req.user._id, journalEncrypted: { $exists: true } }).sort({ 'meta.createdAt': -1, createdAt: -1 });
        if (!mood) return res.status(404).json({ message: 'No journal found' });

        const journal = mood.journal; // virtual decrypts
        const analysis = await analyzeJournal(journal);
        res.json({ journalSummary: analysis });
    } catch (err) {
        next(err);
    }
};
