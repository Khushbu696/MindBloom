const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encrypt');

const MoodLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moodScore: { type: Number, min: 0, max: 10, required: true },
    emotions: [{ type: String }],

    title: { type: String },

    journalEncrypted: { type: String },
    voiceNotePath: { type: String },

    meta: {
        moodCategory: String,
        createdAt: { type: Date, default: Date.now }
    }
});

// virtual to set/get journal (decrypt automatically)
MoodLogSchema.virtual('journal')
    .get(function () {
        if (!this.journalEncrypted) return '';
        try { return decrypt(this.journalEncrypted); } catch (e) { return ''; }
    })
    .set(function (val) {
        if (!val) this.journalEncrypted = undefined;
        else this.journalEncrypted = encrypt(val);
    });

MoodLogSchema.set('toJSON', { virtuals: true });
MoodLogSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('MoodLog', MoodLogSchema);
