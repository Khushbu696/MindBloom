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
            .sort({ createdAt: -1 })
            .limit(100);

        const sanitized = posts.map(p => ({
            id: p._id,
            title: p.title,
            body: p.body,
            likesCount: p.likes.length,
            createdAt: p.createdAt,
            author: p.anonymous ? "Anonymous" : p.user.username
        }));

        res.json(sanitized);

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
