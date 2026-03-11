const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      default: "Anonymous",
    },

    avatar: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
