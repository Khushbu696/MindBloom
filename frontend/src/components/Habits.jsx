import React, { useEffect, useState } from "react";
import "../styles/Habits.css";

const API = "http://localhost:5000/api/habits";

const emojiOptions = [
  "🧘",
  "🏃",
  "📚",
  "💧",
  "🧠",
  "🌙",
  "🥗",
  "🚶",
  "🛏️",
  "🎨",
];

const DEFAULT_EMOJI = "⭐";

const Habits = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [habits, setHabits] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    type: "daily",
  });

  const fetchHabits = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setHabits(data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const toggleHabit = async (id) => {
    await fetch(`${API}/toggle/${id}`, { method: "PATCH" });
    fetchHabits();
  };

  const deleteHabit = async () => {
    await fetch(`${API}/${deleteTarget}`, {
      method: "DELETE",
    });

    setDeleteTarget(null);
    fetchHabits();
  };

  const addHabit = async (e) => {
    e.preventDefault();

    const habitPayload = {
      ...formData,
      icon: formData.icon || DEFAULT_EMOJI,
    };

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitPayload),
    });

    setFormData({
      name: "",
      description: "",
      icon: "",
      type: "daily",
    });

    setShowForm(false);
    fetchHabits();
  };

  const filteredHabits = habits.filter((h) => h.type === activeTab);

  const renderHabitCard = (item) => (
    <div key={item._id} className="habit-card">
      <div className="habit-left">
        <input
          type="checkbox"
          checked={item.completed}
          disabled={item.completed}
          onChange={() => toggleHabit(item._id)}
          className="habit-checkbox"
        />

        <div className="habit-icon">{item.icon || DEFAULT_EMOJI}</div>

        <div className="habit-content">
          <div className="habit-title">{item.name}</div>

          {item.description && (
            <div className="habit-description">{item.description}</div>
          )}
        </div>
      </div>

      <div className="habit-right">
        <div className="habit-streak">🔥 {item.streak}</div>

        <button
          className="habit-delete"
          onClick={() => setDeleteTarget(item._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );

  return (
    <div className="habits-page">
      <div className="habits-container">
        {/* Header */}

        <div className="page-header">
          <div>
            <h1 className="page-title">Habit Tracker</h1>
            <p className="page-subtitle">
              Build consistency, one day at a time
            </p>
          </div>

          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Habit
          </button>
        </div>

        {/* Tabs */}

        <div className="habits-tabs">
          <button
            className={`tab-btn ${activeTab === "daily" ? "active" : ""}`}
            onClick={() => setActiveTab("daily")}
          >
            Daily Habits
          </button>

          <button
            className={`tab-btn ${activeTab === "weekly" ? "active" : ""}`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly Goals
          </button>
        </div>

        {/* Habits List */}

        <div className="habits-main card">
          <h3>
            {activeTab === "daily" ? "Today's Habits" : "This Week's Goals"}
          </h3>

          <div className="habits-list">
            {filteredHabits.length === 0 ? (
              <p className="empty-state">
                No habits yet. Click "Add Habit" to begin 🌱
              </p>
            ) : (
              filteredHabits.map(renderHabitCard)
            )}
          </div>
        </div>
      </div>

      {/* Add Habit Modal */}

      {showForm && (
        <div className="confirm-overlay">
          <div className="confirm-box habit-modal">
            <h3>Add Habit</h3>

            <form onSubmit={addHabit}>
              <input
                placeholder="Habit name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              {/* Emoji Picker */}

              <div className="emoji-picker">
                <label>Select an icon</label>

                <div className="emoji-grid">
                  {emojiOptions.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      className={`emoji-btn ${
                        formData.icon === emoji ? "selected" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, icon: emoji })}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>

              <div className="confirm-actions">
                <button className="btn btn-primary">Save</button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}

      {deleteTarget && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Delete Habit?</h3>
            <p>This action cannot be undone.</p>

            <div className="confirm-actions">
              <button className="btn btn-danger" onClick={deleteHabit}>
                Delete
              </button>

              <button className="btn" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;
