import { useEffect, useState } from "react";
import "../styles/Rewards.css";

const API = "https://mindbloom-er4l.onrender.com/api/rewards";

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [userProgress, setUserProgress] = useState({});
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    const res = await fetch(API);
    const data = await res.json();

    setUserProgress(data.userProgress);
    setAchievements(data.achievements);
  };

  const categories = [
    { id: "all", label: "All", icon: "🏆" },
    { id: "mood", label: "Mood", icon: "💭" },
    { id: "habits", label: "Habits", icon: "✓" },
    { id: "streaks", label: "Streaks", icon: "🔥" },
    { id: "community", label: "Community", icon: "🤝" },
  ];

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  return (
    <div className="rewards-page">
      <div className="rewards-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Rewards & Achievements</h1>
            <p className="page-subtitle">Celebrate your wellness journey</p>
          </div>
        </div>

        {/* Progress */}

        <div className="user-progress-section card">
          <div className="progress-header">
            <div className="level-badge">
              <div className="level-icon">🌸</div>

              <div>
                <div className="level-number">Level {userProgress.level}</div>

                <div className="level-title">Blooming Mind</div>
              </div>
            </div>

            <div className="bloom-points">
              <span className="points-icon">⚡</span>

              <span className="points-value">{userProgress.bloomPoints}</span>

              <span className="points-label">Bloom Points</span>
            </div>
          </div>

          <div className="xp-progress">
            <div className="xp-bar">
              <div
                className="xp-fill"
                style={{
                  width: `${
                    (userProgress.currentXP / userProgress.nextLevelXP) * 100
                  }%`,
                }}
              />
            </div>

            <div className="xp-text">
              {userProgress.currentXP} /{userProgress.nextLevelXP} XP
            </div>
          </div>
        </div>

        {/* Achievements */}

        <div className="achievements-section">
          <div className="section-header">
            <h2>Achievements</h2>

            <span className="unlocked-count">
              {achievements.filter((a) => a.unlocked).length} /
              {achievements.length} Unlocked
            </span>
          </div>

          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>

          <div className="achievements-grid">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`achievement-card card ${
                  achievement.unlocked ? "unlocked" : "locked"
                }`}
              >
                <div className="achievement-icon-wrapper">
                  <span className="achievement-icon">{achievement.icon}</span>

                  {achievement.unlocked && (
                    <div className="achievement-check">✓</div>
                  )}
                </div>

                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>

                  <p className="achievement-description">
                    {achievement.description}
                  </p>

                  {achievement.unlocked ? (
                    <div className="achievement-footer">
                      <span className="achievement-xp">
                        +{achievement.xp} XP
                      </span>
                    </div>
                  ) : (
                    <div className="achievement-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (achievement.progress / achievement.total) * 100
                            }%`,
                          }}
                        />
                      </div>

                      <div className="progress-text">
                        {achievement.progress} /{achievement.total}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
