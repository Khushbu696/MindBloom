const WearableData = require('../models/WearableData');

exports.storeData = async (req, res, next) => {
    try {
        const { provider, data } = req.body; // data: raw JSON synced from provider
        const w = await WearableData.create({ user: req.user._id, provider, data });
        res.status(201).json(w);
    } catch (err) { next(err); }
};

exports.getData = async (req, res, next) => {
    try {
        const items = await WearableData.find({ user: req.user._id }).sort({ syncedAt: -1 }).limit(50);
        res.json(items);
    } catch (err) { next(err); }
};
