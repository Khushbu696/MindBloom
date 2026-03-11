const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    icon: {
      type: String,
      default: "⭐",
    },

    type: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    streak: {
      type: Number,
      default: 0,
    },

    lastCompleted: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Habit", habitSchema);
