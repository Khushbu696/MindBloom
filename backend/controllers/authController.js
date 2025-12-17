const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
}

// REGISTER USER
exports.register = async (req, res, next) => {
    try {
        const { username, password, isTherapist } = req.body;

        // Check if username already exists
        const exists = await User.findOne({ username });
        if (exists)
            return res.status(400).json({ message: "Username already taken" });

        // Create user
        const user = await User.create({
            username,
            password,
            isTherapist
        });

        res.status(201).json({
            token: generateToken(user._id),
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        next(err);
    }
};

// LOGIN USER
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            token: generateToken(user._id),
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        next(err);
    }
};

// GET LOGGED-IN USER
exports.me = async (req, res, next) => {
    res.json(req.user);
};
