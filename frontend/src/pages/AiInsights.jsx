import "../styles/aiInsights.css";
import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AiInsights() {
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get("/ai/analyze-latest");
            setAnalysis(res.data.journalSummary);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching AI insights");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-container">
            <h2 className="ai-header">🧠 AI Insights</h2>

            <button
                onClick={handleAnalyze}
                className="ai-btn"
                disabled={loading}
            >
                {loading ? "Analyzing..." : "Analyze My Latest Journal"}
            </button>

            {error && <p className="ai-error">{error}</p>}

            {analysis && (
                <div className="ai-result">
                    <pre>{JSON.stringify(analysis, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
