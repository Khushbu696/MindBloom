import "../styles/community.css";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { FaHeart, FaRegHeart, FaCommentDots } from "react-icons/fa";

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await axiosClient.get("/community");
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!body.trim()) return;

        setLoading(true);

        try {
            await axiosClient.post("/community", {
                title,
                body,
                anonymous: false
            });

            setBody("");
            setTitle("");
            setShowForm(false);
            fetchPosts();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id) => {
        try {
            await axiosClient.post(`/community/${id}/like`);
            fetchPosts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="community-page">

            {/* HEADER */}
            <div className="community-header">
                <div>
                    <h1 className="comm-title">Community</h1>
                    <p className="comm-subtitle">
                        Connect with others on their wellness journey
                    </p>
                </div>

                <button className="create-btn" onClick={() => setShowForm(true)}>
                    + Create Post
                </button>
            </div>

            {/* CREATE POST POPUP */}
            {showForm && (
                <div className="popup-overlay" onClick={() => setShowForm(false)}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Create a Post</h3>

                        <form onSubmit={handleCreatePost}>
                            <input
                                type="text"
                                placeholder="Title (optional)"
                                className="popup-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                className="popup-textarea"
                                rows={4}
                                placeholder="Share your thoughts..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />

                            <div className="popup-actions">
                                <button
                                    type="button"
                                    className="popup-cancel"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button className="popup-submit" disabled={loading}>
                                    {loading ? "Posting..." : "Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* POSTS FEED */}
            <div className="community-feed">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">

                        {/* AVATAR + NAME */}
                        <div className="post-header">
                            <div className="avatar">
                                {post.author?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="post-author">{post.author}</p>
                                <p className="post-time">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* BODY */}
                        <p className="post-body">{post.body}</p>

                        {/* ACTIONS */}
                        <div className="post-actions">
                            <button className="action-btn" onClick={() => handleLike(post._id)}>
                                {post.likedByUser ? <FaHeart className="liked" /> : <FaRegHeart />}
                                <span>{post.likesCount}</span>
                            </button>

                            <div className="action-btn">
                                <FaCommentDots />
                                <span>{post.commentsCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
