import "../styles/habits.css";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import flame from "../assets/flame_icon.png";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [deleteHabit, setDeleteHabit] = useState(null);

  const fetchHabits = async () => {
    try {
      const res = await axiosClient.get("/habits");
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  /* ---------- SAVE / UPDATE HABIT ---------- */
  const handleSaveHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      if (editingHabit) {
        await axiosClient.put(`/habits/${editingHabit._id}`, {
          title,
          description
        });
        setMessage("Habit updated!");
      } else {
        await axiosClient.post("/habits", { title, description });
        setMessage("Habit created!");
      }

      fetchHabits();

      setTimeout(() => {
        setShowModal(false);
        setEditingHabit(null);
        setTitle("");
        setDescription("");
        setMessage("");
      }, 600);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving habit");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE HABIT ---------- */
  const confirmDeleteHabit = async () => {
    try {
      await axiosClient.delete(`/habits/${deleteHabit._id}`);
      setDeleteHabit(null);
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="habits-page">

      {/* HEADER */}
      <div className="habits-header">
        <div>
          <h1 className="habits-title">Habit Streaks</h1>
          <p className="habits-subtitle">
            Build positive habits and track your progress
          </p>
        </div>

        <button
          className="open-modal-btn"
          onClick={() => {
            setEditingHabit(null);
            setTitle("");
            setDescription("");
            setShowModal(true);
          }}
        >
          + Add Habit
        </button>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="form-title">
              {editingHabit ? "Edit Habit" : "Add New Habit"}
            </h2>

            <form onSubmit={handleSaveHabit}>
              <label className="form-label">Habit Name</label>
              <input
                className="form-input"
                placeholder="e.g., Morning meditation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="form-label">Description (Optional)</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Describe your habit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="add-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save Habit"}
                </button>
              </div>

              {message && <p className="form-message">{message}</p>}
            </form>
          </div>
        </div>
      )}

      {/* HABITS LIST */}
      <h2 className="your-habits-title">Your Habits</h2>

      <div className="habit-list">
        {habits.length === 0 ? (
          <p className="empty-habits">
            No habits yet. Start by creating one!
          </p>
        ) : (
          <div className="habit-grid">
            {habits.map((habit) => (
              <div key={habit._id} className="habit-card">
                <div className="habit-card-header">
                  <h3 className="habit-name">{habit.title}</h3>

                  <div className="habit-actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingHabit(habit);
                        setTitle(habit.title);
                        setDescription(habit.description || "");
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => setDeleteHabit(habit)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="habit-desc">{habit.description}</p>

                <div className="habit-streak-box">
                  <img src={flame} alt="Streak" className="habit-icon" />
                  <span>{habit.streak}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteHabit && (
        <div
          className="modal-overlay"
          onClick={() => setDeleteHabit(null)}
        >
          <div
            className="delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Habit?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteHabit(null)}
              >
                Cancel
              </button>

              <button
                className="delete-confirm"
                onClick={confirmDeleteHabit}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
