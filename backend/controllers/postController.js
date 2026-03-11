const Post = require("../models/Post");

/* Create post */
exports.createPost = async (req, res) => {
  try {
    const { author, title, content } = req.body;

    const avatar =
      "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
      Math.floor(Math.random() * 10000);

    const post = new Post({
      author: author || "Anonymous",
      avatar,
      title,
      content,
    });

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Get posts */
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Like post toggle */
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const { action } = req.body;

    if (action === "like") {
      post.likes += 1;
    } else if (action === "unlike" && post.likes > 0) {
      post.likes -= 1;
    }

    await post.save();

    res.json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};