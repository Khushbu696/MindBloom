import { Link } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
    return (
        <div className="hero">
            {/* NAVBAR */}
            <div className="hero-nav">
                <h1 className="hero-logo">MindBloom</h1>

                <div className="hero-nav-right">
                    <Link to="/login" className="hero-nav-btn">Login</Link>
                    <Link to="/register" className="hero-nav-btn">Sign Up</Link>
                </div>
            </div>

            {/* HERO CONTENT */}
            <div className="hero-content">
                <p className="hero-subtitle">Your Journey to Mental Wellness</p>

                <h1 className="hero-title">
                    Bloom Into Your Best <br /> Self
                </h1>

                <p className="hero-text">
                    Track your moods, build positive habits, connect with a <br />
                    supportive community, and celebrate your progress with rewards.
                </p>

                <Link to="/register" className="hero-btn">Get Started</Link>
            </div>
        </div>
    );
}
