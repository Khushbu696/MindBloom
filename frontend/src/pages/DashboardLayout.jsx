import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import useUserStore from "../store/userStore";

import dashboard_icon from "../assets/dashboard_icon.png";
import book_icon from "../assets/book_icon.png";
import flame_icon from "../assets/flame_icon.png";
import gift_icon from "../assets/gift_icon.png";
import users_icon from "../assets/users_icon.png";
import logout_icon from "../assets/logout_icon.png";

export default function DashboardLayout() {
    const { logout } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="dashboard-layout">

            {/* SIDEBAR */}
            <aside className="sidebar">
                <div>
                    <h2 className="sidebar-logo">MindBloom</h2>

                    <nav className="sidebar-menu">
                        <NavLink to="/dashboard" end className="sidebar-link">
                            <img src={dashboard_icon} alt="Overview" className="icon" />
                            Overview
                        </NavLink>

                        <NavLink to="/dashboard/moods" className="sidebar-link">
                            <img src={book_icon} alt="Mood Logs" className="icon" />
                            Mood Logs
                        </NavLink>

                        <NavLink to="/dashboard/habits" className="sidebar-link">
                            <img src={flame_icon} alt="Habits" className="icon" />
                            Habit Streaks
                        </NavLink>

                        <NavLink to="/dashboard/community" className="sidebar-link">
                            <img src={users_icon} alt="Community" className="icon" />
                            Community
                        </NavLink>

                        <NavLink to="/dashboard/rewards" className="sidebar-link">
                            <img src={gift_icon} alt="Rewards" className="icon" />
                            Rewards
                        </NavLink>
                    </nav>
                </div>

                <button
                    className="sidebar-logout"
                    onClick={() => {
                        logout();
                        navigate("/");
                    }}
                >
                    <img src={logout_icon} alt="Logout" className="icon" />
                    Logout
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
}
