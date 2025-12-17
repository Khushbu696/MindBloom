import "../styles/register.css";
import { useState } from "react";
import useUserStore from "../store/userStore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const { register, error, loading } = useUserStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return;

        const success = await register(username, password);
        if (success) navigate("/dashboard");
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h1 className="register-title">Join MindBloom</h1>
                <p className="register-subtitle">
                    Start your mental wellness journey today
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="register-label">Username</label>
                    <input
                        type="text"
                        className="register-input"
                        placeholder="Choose a username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="register-label">Password</label>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="register-label">Confirm Password</label>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && <p className="register-error">{error}</p>}

                    <button disabled={loading} className="register-submit-btn">
                        Create Account
                    </button>
                </form>

                <p className="register-bottom-text">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
