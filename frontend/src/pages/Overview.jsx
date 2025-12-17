import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import useUserStore from "../store/userStore";

import dashboard_icon from "../assets/dashboard_icon.png";
import arrow_icon from "../assets/arrow_icon.png";
import book_icon from "../assets/book_icon.png";
import flame_icon from "../assets/flame_icon.png";

export default function Overview() {
    const { user } = useUserStore();

    const [stats, setStats] = useState({
        moodLogs: 0,
        activeHabits: 0,
        currentStreak: 0,
        totalPoints: 0
    });

    const [recentActivity, setRecentActivity] = useState([]);

    const quickTips = [
        {
            title: "Stay Consistent",
            text: "Keep up your habit streak! Consistency is key to building lasting change."
        },
        {
            title: "Journal Daily",
            text: "Writing about your feelings helps process emotions and track patterns."
        },
        {
            title: "Celebrate Small Wins",
            text: "Progress is built through small steps. Acknowledge every win—big or small—to stay motivated."
        }
    ];

    useEffect(() => {
        async function loadStats() {
            try {
                const res = await axiosClient.get("/overview");
                setStats(res.data.stats);
                setRecentActivity(res.data.recentActivities || []);
            } catch (err) {
                console.error("Error loading overview:", err);
            }
        }

        loadStats();
    }, []);

    return (
        <div className="overview-page">

            <h1 className="overview-title">Overview</h1>
            <p className="overview-subtitle">
                Welcome back! Here's your wellness summary.
            </p>

            {/* TOP METRICS */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div>
                        <p className="metric-label">Mood Logs</p>
                        <h2 className="metric-number">{stats.moodLogs}</h2>
                    </div>
                    <img src={book_icon} alt="" className="metric-icon" />
                </div>

                <div className="metric-card">
                    <div>
                        <p className="metric-label">Active Habits</p>
                        <h2 className="metric-number">{stats.activeHabits}</h2>
                    </div>
                    <img src={flame_icon} alt="" className="metric-icon" />
                </div>

                <div className="metric-card">
                    <div>
                        <p className="metric-label">Current Streak</p>
                        <h2 className="metric-number">{stats.currentStreak} days</h2>
                    </div>
                    <img src={arrow_icon} alt="" className="metric-icon" />
                </div>

                <div className="metric-card">
                    <div>
                        <p className="metric-label">Total Points</p>
                        <h2 className="metric-number">{stats.totalPoints}</h2>
                    </div>
                    <img src={dashboard_icon} alt="" className="metric-icon" />
                </div>
            </div>

            {/* BOTTOM GRID */}
            <div className="bottom-grid">

                {/* RECENT ACTIVITY */}
                <div className="activity-card">
                    <h3 className="section-title">Recent Activity</h3>

                    {recentActivity.length === 0 ? (
                        <p className="empty-activity">No recent activity yet.</p>
                    ) : (
                        recentActivity.map((item, idx) => (
                            <div key={idx} className="activity-item">
                                <span className={`activity-dot ${item.type}`}></span>
                                <div>
                                    <p className="activity-text">{item.message}</p>
                                    <p className="activity-time">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* QUICK TIPS */}
                <div className="tips-card">
                    <h3 className="section-title">Quick Tips</h3>

                    {quickTips.map((tip, idx) => (
                        <div key={idx} className="tip-box">
                            <h4 className="tip-title">{tip.title}</h4>
                            <p className="tip-text">{tip.text}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
