import React, { useEffect, useState } from "react";
import "../styles/Community.css";

const API = "https://mindbloom-er4l.onrender.com/api/posts";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [likedPosts, setLikedPosts] = useState(
    JSON.parse(localStorage.getItem("likedPosts")) || [],
  );

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
  });

  const fetchPosts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleLike = async (id) => {
    const isLiked = likedPosts.includes(id);

    const action = isLiked ? "unlike" : "like";

    await fetch(`${API}/like/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    let updatedLikes;

    if (isLiked) {
      updatedLikes = likedPosts.filter((p) => p !== id);
    } else {
      updatedLikes = [...likedPosts, id];
    }

    setLikedPosts(updatedLikes);

    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));

    fetchPosts();
  };

  const createPost = async (e) => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      author: "",
      title: "",
      content: "",
    });

    setShowModal(false);

    fetchPosts();
  };

  return (
    <div className="community-page">
      <div className="community-container">
        {/* Header */}

        <div className="page-header">
          <div>
            <h1 className="page-title">Community</h1>
            <p className="page-subtitle">
              Connect, share, and support each other
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + New Post
          </button>
        </div>

        {/* Posts */}

        <div className="forums-section">
          {posts.map((post) => {
            const isExpanded = expandedPost === post._id;

            const isLiked = likedPosts.includes(post._id);

            const text = isExpanded ? post.content : post.content.slice(0, 150);

            return (
              <div key={post._id} className="forum-post card">
                <div className="post-header">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="post-avatar"
                  />

                  <div className="post-meta">
                    <div className="post-author">{post.author}</div>

                    <div className="post-time">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <h3 className="post-title">{post.title}</h3>

                <p className="post-preview">
                  {text}

                  {post.content.length > 150 && (
                    <span
                      className="read-more"
                      onClick={() =>
                        setExpandedPost(isExpanded ? null : post._id)
                      }
                    >
                      {isExpanded ? " show less" : "... read more"}
                    </span>
                  )}
                </p>

                <div className="post-footer">
                  <button
                    className={`post-action ${isLiked ? "liked" : ""}`}
                    onClick={() => toggleLike(post._id)}
                  >
                    ❤️ {post.likes}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Create Post</h3>

            <form onSubmit={createPost} className="post-form">
              <input
                placeholder="Your name (optional)"
                value={formData.author}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
              />

              <input
                placeholder="Post title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Share what's on your mind..."
                required
                rows="5"
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
              />

              <div className="confirm-actions">
                <button className="btn btn-primary">Post</button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
