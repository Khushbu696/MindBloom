import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: "💭",
      title: "Mood Tracking",
      description: "Log your emotions with journal entries and voice notes",
      color: "#7BA5D6",
    },
    {
      icon: "🌱",
      title: "Habit Building",
      description: "Create healthy routines with streaks and rewards",
      color: "#A8D5BA",
    },
    {
      icon: "🤖",
      title: "AI Insights",
      description: "Get personalized coping strategies and wellness tips",
      color: "#B8A8D6",
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Connect with supportive peers anonymously",
      color: "#F5A8C5",
    },
    {
      icon: "🏆",
      title: "Rewards",
      description: "Earn badges and unlock achievements",
      color: "#F5C5A8",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "End-to-end encryption keeps your data safe",
      color: "#6FD89C",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "MindBloom helped me understand my patterns and build healthier habits.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "James K.",
      text: "The community support and gamification make self-care actually enjoyable!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    {
      name: "Maya L.",
      text: "Finally, a mental health app that respects my privacy while helping me grow.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    },
  ];

  return (
    <div className="home-page">
      {/* Top Right Auth Buttons */}
      <div className="home-auth">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge fade-in">
              <span className="badge badge-primary">
                🌸 Welcome to MindBloom
              </span>
            </div>
            <h1 className="hero-title slide-up">
              Nurture Your Mind,
              <br />
              <span className="gradient-text">Bloom With Joy</span>
            </h1>
            <p className="hero-description slide-up">
              Track your mental wellness through mood logs, build lasting
              habits, and connect with a supportive community—all while earning
              rewards for your self-care journey.
            </p>
            <div className="hero-buttons slide-up">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                <span>Start Your Journey</span>
                <span>→</span>
              </button>
            </div>
            <div className="hero-stats slide-up">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Mood Logs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">User Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1 float">
              <div className="mini-card">
                <span className="mini-icon">😊</span>
                <div className="mini-content">
                  <div className="mini-label">Today's Mood</div>
                  <div className="mini-value">Happy</div>
                </div>
              </div>
            </div>
            <div className="floating-card card-2 float">
              <div className="mini-card">
                <span className="mini-icon">🔥</span>
                <div className="mini-content">
                  <div className="mini-label">Streak</div>
                  <div className="mini-value">7 Days</div>
                </div>
              </div>
            </div>
            <div className="floating-card card-3 float">
              <div className="mini-card">
                <span className="mini-icon">🏆</span>
                <div className="mini-content">
                  <div className="mini-label">Achievements</div>
                  <div className="mini-value">12</div>
                </div>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="illustration-circle circle-1"></div>
              <div className="illustration-circle circle-2"></div>
              <div className="illustration-circle circle-3"></div>
              <div className="central-flower">🌸</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Thrive</h2>
          <p className="section-subtitle">
            Comprehensive tools for your mental wellness journey
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="feature-icon"
                style={{
                  background: `${feature.color}20`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">Your Journey in 3 Simple Steps</h2>
        </div>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Track Your Mood</h3>
              <p>
                Log daily emotions with journal entries, sliders, or voice notes
              </p>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Build Habits</h3>
              <p>Set wellness goals and earn rewards for consistency</p>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Get Insights</h3>
              <p>Receive AI-powered recommendations for better wellbeing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">Loved by Thousands</h2>
          <p className="section-subtitle">See what our community says</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} />
                <span>{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Wellness Journey?</h2>
          <p className="cta-description">
            Join thousands of users who are taking control of their mental
            health
          </p>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/register")}
          >
            <span>Get Started Free</span>
            <span>✨</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
