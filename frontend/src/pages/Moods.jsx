import "../styles/moods.css";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import angry from "../assets/angry_face.png";
import happy from "../assets/happy_face.png";
import sad from "../assets/sad_face.png";
import anxious from "../assets/anxious_face.png";
import tired from "../assets/tea_cup.png";
import stressed from "../assets/stressed_face.png";

export default function Moods() {
    const [selectedEmotion, setSelectedEmotion] = useState("");
    const [intensity, setIntensity] = useState(5);
    const [title, setTitle] = useState("");
    const [journal, setJournal] = useState("");
    const [entries, setEntries] = useState([]);
    const [viewModal, setViewModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);


    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const res = await axiosClient.get("/moods");
            setEntries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const emotionOptions = [
        { label: "Happy", icon: happy },
        { label: "Sad", icon: sad },
        { label: "Angry", icon: angry },
        { label: "Tired", icon: tired },
        { label: "Stressed", icon: stressed },
        { label: "Anxious", icon: anxious },
    ];

    const handleIntensityClick = (value) => {
        setIntensity(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            moodScore: intensity,
            emotions: [selectedEmotion],
            title,
            journal
        };

        try {
            await axiosClient.post("/moods", formData);
            setSelectedEmotion("");
            setIntensity(5);
            setTitle("");
            setJournal("");
            loadEntries();
        } catch (err) {
            console.error(err);
        }
    };

    const handleView = (entry) => {
        alert(
            `Title: ${entry.title}\n\nMood: ${entry.emotions[0]}\nIntensity: ${entry.moodScore}\n\nJournal:\n${entry.journal}`
        );
    };

    const confirmDelete = async (id) => {
        try {
            await axiosClient.delete(`/moods/${id}`);
            setDeleteModal(null);
            loadEntries();
        } catch (err) {
            console.error(err);
        }
    };    

    return (
        <div className="mood-page">

            <div className="mood-left">

                <h1 className="mood-header">Mood Logs</h1>
                <p className="mood-subheader">Track and reflect on your emotional journey</p>

                <h3 className="mood-section-title">How are you feeling?</h3>

                {/* EMOTION GRID */}
                <div className="emotion-grid">
                    {emotionOptions.map((emo) => (
                        <div
                            key={emo.label}
                            className={`emotion-card ${selectedEmotion === emo.label ? "active" : ""}`}
                            onClick={() => setSelectedEmotion(emo.label)}
                        >
                            <img src={emo.icon} alt={emo.label} className="emotion-icon" />
                            <p>{emo.label}</p>
                        </div>
                    ))}
                </div>

                {/* INTENSITY SELECTOR */}
                <div className="intensity-row">
                    <p>Intensity</p>
                    <p className="intensity-value">{intensity}</p>
                </div>

                <div className="intensity-grid">
                    {Array.from({ length: 11 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handleIntensityClick(i)}
                            className={`intensity-box ${intensity === i ? "active" : ""}`}
                        >
                            {i}
                        </button>
                    ))}
                </div>

                {/* JOURNAL ENTRY */}
                <div className="journal-card">
                    <h3>Create Journal Entry</h3>

                    <label>Title</label>
                    <input
                        type="text"
                        className="journal-input"
                        placeholder="Enter a title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>How are you feeling?</label>
                    <textarea
                        className="journal-textarea"
                        placeholder="Express your thoughts and feelings..."
                        value={journal}
                        onChange={(e) => setJournal(e.target.value)}
                    ></textarea>

                    <div className="journal-btn-row">
                        <button className="journal-save" onClick={handleSubmit}>Save Entry</button>
                        <button
                            className="journal-cancel"
                            onClick={() => {
                                setTitle("");
                                setJournal("");
                                setSelectedEmotion("");
                                setIntensity(5);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>

            {/* RIGHT SIDE — JOURNAL ENTRIES */}
            <div className="mood-right">
                <h3 className="entries-title">Journal Entries</h3>

                <div className="entries-list">
                    {entries.map((entry) => (
                        <div className="entry-card" key={entry._id}>
                            <p className="entry-title">{entry.title}</p>
                            <p className="entry-date">
                                {new Date(entry.meta?.createdAt).toDateString()}
                            </p>
                            <p className="entry-preview">{entry.journal?.slice(0, 100)}...</p>

                            <div className="entry-actions">
                                <button className="entry-view" onClick={() => setViewModal(entry)}>
                                    View
                                </button>

                                <button className="entry-delete" onClick={() => setDeleteModal(entry._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* VIEW JOURNAL MODAL */}
            {viewModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>{viewModal.title}</h2>

                        <p className="modal-meta">
                            {new Date(viewModal.meta?.createdAt).toDateString()}
                        </p>

                        <p><strong>Mood:</strong> {viewModal.emotions[0]}</p>
                        <p><strong>Intensity:</strong> {viewModal.moodScore}</p>

                        <h4>Journal Entry</h4>
                        <p className="modal-journal">{viewModal.journal}</p>

                        <button className="modal-close" onClick={() => setViewModal(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box delete-box">
                        <h3>Delete Entry?</h3>
                        <p>This action cannot be undone.</p>

                        <div className="modal-actions">
                            <button
                                className="modal-cancel"
                                onClick={() => setDeleteModal(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="modal-delete"
                                onClick={() => confirmDelete(deleteModal)}
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
