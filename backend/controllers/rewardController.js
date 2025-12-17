const Reward = require("../models/Reward");
const User = require("../models/User");
const { getRewardStatus } = require("../utils/rewardStatus");

exports.listRewards = async (req, res, next) => {
    try {
        const rewards = await Reward.find({ active: true });
        const user = await User.findById(req.user._id);

        const formatted = rewards.map((reward) => {
            const status = getRewardStatus(reward, user);
            const alreadyClaimed = user.rewardsClaimed.some(
                (r) => r.rewardId.toString() === reward._id.toString()
            );

            return {
                ...reward._doc,
                status,
                alreadyClaimed,
                claimable: status === "completed" && !alreadyClaimed
            };
        });

        res.json(formatted);
    } catch (err) { next(err); }
};

exports.claimReward = async (req, res, next) => {
    try {
        const reward = await Reward.findById(req.params.id);
        const user = await User.findById(req.user._id);

        if (!reward)
            return res.status(404).json({ message: "Reward not found" });

        const status = getRewardStatus(reward, user);

        if (status !== "completed")
            return res.status(400).json({ message: "Reward not completed yet" });

        const alreadyClaimed = user.rewardsClaimed.some(
            (r) => r.rewardId.toString() === reward._id.toString()
        );

        if (alreadyClaimed)
            return res.status(400).json({ message: "Already claimed" });

        // Add XP
        user.xp += reward.points;

        // Mark reward as claimed
        user.rewardsClaimed.push({
            rewardId: reward._id,
            claimedAt: new Date()
        });

        await user.save();

        res.json({ message: "Reward claimed successfully", xp: user.xp });
    } catch (err) { next(err); }
};
