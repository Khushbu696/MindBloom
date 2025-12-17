import "../styles/login.css";
import { useState } from "react";
import useUserStore from "../store/userStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login, error, loading } = useUserStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) navigate("/dashboard");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">
                    Sign in to continue your wellness journey
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="login-label">Username</label>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="login-label">Password</label>
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="login-error">{error}</p>}

                    <button className="login-submit-btn" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="login-bottom-text">
                    Don’t have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
