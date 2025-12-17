const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    isTherapist: {
        type: Boolean,
        default: false
    },

    xp: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 1
    },

    therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    stats: {
        moodLogsCount: { type: Number, default: 0 },
        journalCount: { type: Number, default: 0 },
        likesReceived: { type: Number, default: 0 },
        communityPosts: { type: Number, default: 0 },
        streakDays: { type: Number, default: 0 },
        habitStreaks: { type: Number, default: 0 }
    },

    rewardsClaimed: [
        {
            rewardId: { type: mongoose.Schema.Types.ObjectId, ref: "Reward" },
            claimedAt: { type: Date }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.matchPassword = async function (entered) {
    return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", UserSchema);
