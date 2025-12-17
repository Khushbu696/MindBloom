const mongoose = require('mongoose');

const WearableDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: String }, // 'fitbit', 'googlefit', etc
    data: { type: mongoose.Schema.Types.Mixed }, // store raw provider data
    syncedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WearableData', WearableDataSchema);
