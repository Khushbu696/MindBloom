const mongoose = require("mongoose");

const moodLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      required: true,
    },

    intensity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MoodLog", moodLogSchema);
