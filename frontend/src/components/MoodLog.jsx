import { useState, useEffect } from "react";
import "../styles/MoodLog.css";

const MoodLog = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);

  const token = localStorage.getItem("token");

  const moods = [
    { id: "happy", emoji: "😊", label: "Happy", color: "#6FD89C" },
    { id: "excited", emoji: "🤩", label: "Excited", color: "#F5C5A8" },
    { id: "calm", emoji: "😌", label: "Calm", color: "#A8D5BA" },
    { id: "sad", emoji: "😢", label: "Sad", color: "#7BA5D6" },
    { id: "anxious", emoji: "😰", label: "Anxious", color: "#F5A962" },
    { id: "angry", emoji: "😠", label: "Angry", color: "#F5A8C5" },
    { id: "tired", emoji: "😴", label: "Tired", color: "#B8A8D6" },
    { id: "neutral", emoji: "😐", label: "Neutral", color: "#B8C5D0" },
  ];

  const emotionTags = [
    "Grateful",
    "Stressed",
    "Motivated",
    "Overwhelmed",
    "Peaceful",
    "Lonely",
    "Confident",
    "Worried",
    "Content",
    "Frustrated",
    "Hopeful",
    "Energized",
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const getMoodEmoji = (moodId) => {
    const mood = moods.find((m) => m.id === moodId);
    return mood ? mood.emoji : "🙂";
  };

  // Fetch recent moods
  const fetchMoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/moods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRecentLogs(data);
    } catch (error) {
      console.error("Failed to fetch moods", error);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMood) {
      alert("Please select a mood");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: selectedMood,
          intensity: moodIntensity,
          note: journalEntry,
          tags: selectedTags,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save mood");
      }

      // refresh logs
      fetchMoods();

      // reset form
      setSelectedMood(null);
      setMoodIntensity(5);
      setJournalEntry("");
      setSelectedTags([]);
    } catch (error) {
      console.error(error);
      alert("Could not save mood");
    }
  };

  return (
    <div className="mood-log-page">
      <div className="mood-log-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Mood Log</h1>
            <p className="page-subtitle">How are you feeling today?</p>
          </div>
        </div>

        <div className="mood-entry-section card">
          <h3>Log Your Mood</h3>

          <div className="mood-selection">
            <label className="form-label">How are you feeling?</label>

            <div className="mood-grid">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  className={`mood-btn ${
                    selectedMood === mood.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                  style={{
                    "--mood-color": mood.color,
                    background:
                      selectedMood === mood.id ? `${mood.color}20` : "white",
                  }}
                >
                  <span className="mood-emoji-large">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="intensity-section">
            <label className="form-label">
              Intensity:{" "}
              <span className="intensity-value">{moodIntensity}/10</span>
            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={moodIntensity}
              onChange={(e) => setMoodIntensity(Number(e.target.value))}
              className="intensity-slider"
            />

            <div className="intensity-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="tags-section">
            <label className="form-label">What else are you feeling?</label>

            <div className="tags-grid">
              {emotionTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${
                    selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="journal-section">
            <label className="form-label">Write about it (optional)</label>

            <textarea
              placeholder="What's on your mind?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              rows="5"
            />

            <div className="journal-stats">
              {journalEntry.length} characters
            </div>
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSubmit}>
            Save Mood Log ✓
          </button>
        </div>

        <div className="recent-logs-section card">
          <div className="card-header">
            <h3>Recent Mood Logs</h3>
          </div>

          <div className="logs-list">
            {recentLogs.map((log) => (
              <div key={log._id} className="log-item">
                <div className="log-mood">{getMoodEmoji(log.mood)}</div>

                <div className="log-content">
                  <div className="log-header">
                    <span className="log-date">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>

                    <div className="intensity-dots">
                      Intensity: {log.intensity}/10
                    </div>
                  </div>

                  <p className="log-note">{log.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodLog;
