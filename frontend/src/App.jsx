import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './pages/Hero';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/Overview";
import Moods from "./pages/Moods";
import Habits from "./pages/Habits";
import Community from "./pages/Community";
import Rewards from "./pages/Rewards";
import AiInsights from "./pages/AiInsights";

import DashboardLayout from "./pages/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import useUserStore from "./store/userStore";
import { useEffect } from "react";

function AppContent() {
  const { fetchMe } = useUserStore();

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED DASHBOARD LAYOUT */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="moods" element={<Moods />} />
        <Route path="habits" element={<Habits />} />
        <Route path="community" element={<Community />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="ai" element={<AiInsights />} />
      </Route>

    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <AppContent />
      </div>
    </Router>
  );
}
