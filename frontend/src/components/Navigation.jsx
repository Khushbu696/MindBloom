import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/mood", label: "Mood Log", icon: "💭" },
    { path: "/habits", label: "Habits", icon: "🌱" },
    { path: "/community", label: "Community", icon: "🤝" },
    { path: "/rewards", label: "Rewards", icon: "🏆" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => navigate("/dashboard")}>
          🌸 MindBloom
        </div>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
