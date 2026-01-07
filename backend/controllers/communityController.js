const CommunityPost = require('../models/CommunityPost');

exports.createPost = async (req, res, next) => {
    try {
        const { title, body, anonymous } = req.body;
        const post = await CommunityPost.create({ user: req.user._id, title, body, anonymous });
        res.status(201).json(post);
    } catch (err) { next(err); }
};

exports.listPosts = async (req, res, next) => {
    try {
        const posts = await CommunityPost.find()
            .populate("user", "username")
            .sort({ createdAt: -1 });

        const formatted = posts.map(p => ({
            _id: p._id,
            body: p.body,
            createdAt: p.createdAt,
            author: p.anonymous ? "Anonymous" : p.user.username,
            isMine: p.user._id.toString() === req.user._id.toString(),
            likesCount: p.likes.length,
            likedByUser: p.likes.includes(req.user._id)
        }));

        res.json(formatted);
    } catch (err) {
        next(err);
    }
};

exports.toggleLike = async (req, res, next) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const idx = post.likes.indexOf(req.user._id);
        if (idx === -1) post.likes.push(req.user._id);
        else post.likes.splice(idx, 1);
        await post.save();
        res.json({ likes: post.likes.length });
    } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await CommunityPost.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!post) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (err) {
        next(err);
    }
};
