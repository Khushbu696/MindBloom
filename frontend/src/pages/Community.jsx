import "../styles/community.css";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all"); // all | mine

    useEffect(() => {
        console.log("Logged-in posts:", posts);
        console.log("My post:", posts.find(p => p.isMine === true));
    }, [posts]);

    const fetchPosts = async () => {
        const res = await axiosClient.get("/community");
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!body.trim()) return;

        setLoading(true);
        await axiosClient.post("/community", { body, anonymous: false });
        setBody("");
        setShowForm(false);
        fetchPosts();
        setLoading(false);
    };

    const handleLike = async (id) => {
        await axiosClient.post(`/community/${id}/like`);
        fetchPosts();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        await axiosClient.delete(`/community/${id}`);
        fetchPosts();
    };

    const visiblePosts =
        filter === "mine" ? posts.filter(p => p.isMine) : posts;

    return (
        <div className="community-page">

            <div className="community-header">
                <div>
                    <h1 className="comm-title">Community</h1>
                    <p className="comm-subtitle">
                        Connect with others on their wellness journey
                    </p>
                </div>

                <div className="header-actions">
                    <select
                        className="post-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Posts</option>
                        <option value="mine">My Posts</option>
                    </select>

                    <button className="create-btn" onClick={() => setShowForm(true)}>
                        + Create Post
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="popup-overlay" onClick={() => setShowForm(false)}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Create a Post</h3>

                        <form onSubmit={handleCreatePost}>
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

            <div className="community-feed">
                {visiblePosts.length === 0 ? (
                    <p className="empty-posts">
                        {filter === "mine"
                            ? "You haven't created any posts yet."
                            : "No posts available."}
                    </p>
                ) : (
                    visiblePosts.map(post => (
                        <div key={post._id} className="post-card">
                            <div className="post-header">
                                <div className="avatar">
                                    {post.author.charAt(0).toUpperCase()}
                                </div>

                                <div className="post-meta">
                                    <p className="post-author">{post.author}</p>
                                    <p className="post-time">
                                        {new Date(post.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {post.isMine && (
                                    <button
                                        className="delete-post"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </div>

                            <p className="post-body">{post.body}</p>

                            <div className="post-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => handleLike(post._id)}
                                >
                                    {post.likedByUser ? (
                                        <FaHeart key={`liked-${post._id}`} className="liked" />
                                    ) : (
                                        <FaRegHeart key={`unliked-${post._id}`} />
                                    )}
                                    <span>{post.likesCount}</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
