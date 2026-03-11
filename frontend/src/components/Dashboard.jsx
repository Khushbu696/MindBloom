import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

const API = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json);
  };

  if (!data) return null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome back! 🌸</h1>
            <p className="dashboard-subtitle">
              Here's your wellness overview for today
            </p>
          </div>

          <a href="/mood" className="btn btn-primary">
            Log Mood +
          </a>
        </div>

        {/* QUICK STATS */}
        <div className="quick-stats">
          <div className="stat-card card">
            <div className="stat-emoji">{data.latestMood.emoji}</div>
            <div>
              <div className="stat-value">{data.latestMood.label}</div>
              <div className="stat-label">Today's Mood</div>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-emoji">🔥</div>
            <div>
              <div className="stat-value">{data.maxStreak} Days</div>
              <div className="stat-label">Current Streak</div>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-emoji">🏆</div>
            <div>
              <div className="stat-value">{data.achievements.length}</div>
              <div className="stat-label">Achievements</div>
            </div>
          </div>

          <div className="stat-card card">
            <div className="stat-emoji">⚡</div>
            <div>
              <div className="stat-value">{data.bloomPoints}</div>
              <div className="stat-label">Bloom Points</div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="dashboard-grid">
          {/* MOOD */}
          <div className="mood-tracker card">
            <div className="card-header">
              <h3>This Week's Mood</h3>
              <a href="/mood" className="btn-icon">
                →
              </a>
            </div>

            <div className="mood-chart">
              {data.moodData.length === 0 ? (
                <div className="empty-dashboard">
                  <strong>No mood logs yet.</strong>
                  <br />
                  Start tracking your feelings today 🌸
                </div>
              ) : (
                data.moodData.map((m, i) => (
                  <div key={i} className="mood-bar-container">
                    <div className="mood-emoji">{m.emoji}</div>

                    <div className="mood-bar-bg">
                      <div
                        className="mood-bar"
                        style={{ height: `${m.value * 10}%` }}
                      />
                    </div>

                    <div className="mood-day">{m.day}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* HABITS */}
          <div className="habits-tracker card">
            <div className="card-header">
              <h3>Today's Habits</h3>
              <a href="/habits" className="btn-icon">
                →
              </a>
            </div>

            <div className="habits-list">
              {data.habits.length === 0 ? (
                <div className="empty-dashboard">
                  <strong>No habits yet.</strong>
                  <br />
                  Create your first habit and build a streak 🔥
                </div>
              ) : (
                data.habits.map((h, i) => (
                  <div key={i} className="habit-item">
                    <div className="habit-left">
                      <span className="habit-icon">{h.icon}</span>

                      <div>
                        <div className="habit-name">{h.name}</div>
                        <small>🔥 {h.streak} day streak</small>
                      </div>
                    </div>

                    <div
                      className={`habit-status ${h.completed ? "done" : ""}`}
                    >
                      {h.completed ? "✓" : "○"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="achievements card">
            <div className="card-header">
              <h3>Recent Achievements</h3>
              <a href="/rewards" className="btn-icon">
                →
              </a>
            </div>

            <div className="achievements-list">
              {data.achievements.length === 0 ? (
                <div className="empty-dashboard">
                  <strong>No achievements yet.</strong>
                  <br />
                  Log moods and complete habits to unlock rewards 🏆
                </div>
              ) : (
                data.achievements.map((a, i) => (
                  <div key={i} className="achievement-item">
                    <div
                      className="achievement-icon"
                      style={{
                        background: `${a.color}25`,
                        color: a.color,
                      }}
                    >
                      {a.icon}
                    </div>

                    <div>
                      <div className="achievement-title">{a.title}</div>
                      <div className="achievement-description">
                        {a.description}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-actions card">
            <h3>Quick Actions</h3>

            <div className="actions-grid">
              <a href="/mood" className="action-btn">
                💭 Log Mood
              </a>

              <a href="/habits" className="action-btn">
                ✓ Check Habit
              </a>

              <a href="/community" className="action-btn">
                💬 Community
              </a>

              <a href="/rewards" className="action-btn">
                🎁 Rewards
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
