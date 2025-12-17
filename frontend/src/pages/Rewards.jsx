import "../styles/rewards.css";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import useUserStore from "../store/userStore";

export default function Rewards() {
    const { fetchMe } = useUserStore();
    const [rewards, setRewards] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchRewards = async () => {
        try {
            const res = await axiosClient.get("/rewards");
            setRewards(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    const handleClaim = async (id) => {
        try {
            setLoading(true);
            const res = await axiosClient.post(`/rewards/${id}/claim`);
            setMessage(res.data.message);
            fetchMe();
            fetchRewards();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error claiming reward");
        } finally {
            setLoading(false);
        }
    };

    // NEW — frontend uses backend's "status"
    const filteredRewards = rewards.filter((reward) => {
        if (filter === "all") return true;
        return reward.status === filter;
    });

    return (
        <div className="rewards-page">

            <h1 className="rewards-header-title">Rewards</h1>
            <p className="rewards-header-sub">Earn points by completing tasks and achieving goals</p>

            {/* Filter Tabs */}
            <div className="reward-tabs">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
                    All Tasks
                </button>

                <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
                    Completed
                </button>

                <button className={filter === "in-progress" ? "active" : ""} onClick={() => setFilter("in-progress")}>
                    In Progress
                </button>

                <button className={filter === "not-started" ? "active" : ""} onClick={() => setFilter("not-started")}>
                    Not Started
                </button>
            </div>

            {message && <p className="reward-message">{message}</p>}

            {/* Rewards Grid */}
            <div className="rewards-grid">
                {filteredRewards.map((reward) => (
                    <div key={reward._id} className="reward-card">

                        <div className="reward-card-header">
                            <h3 className="reward-title">{reward.title}</h3>

                            <span className={`reward-status ${reward.status}`}>
                                {reward.status === "completed" && "Completed"}
                                {reward.status === "in-progress" && "In Progress"}
                                {reward.status === "not-started" && "Not Started"}
                            </span>
                        </div>

                        <p className="reward-description">{reward.description}</p>

                        <p className="reward-points">🎁 {reward.points} Points</p>

                        {/* Claim Button ONLY when reward.claimable === true */}
                        {reward.claimable && (
                            <button
                                className="reward-btn"
                                disabled={loading}
                                onClick={() => handleClaim(reward._id)}
                            >
                                {loading ? "Processing..." : "Redeem Reward"}
                            </button>
                        )}

                        {/* If already claimed */}
                        {reward.alreadyClaimed && (
                            <p className="reward-message">Already claimed ✔</p>
                        )}

                    </div>
                ))}

                {filteredRewards.length === 0 && (
                    <p className="no-rewards">No rewards found in this category.</p>
                )}
            </div>

        </div>
    );
}
