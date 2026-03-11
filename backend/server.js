require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://YOUR_NETLIFY_URL.netlify.app"],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/moods", require("./routes/moods"));
app.use("/api/habits", require("./routes/habits"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/rewards", require("./routes/rewards"));
app.use("/api/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MindBloom backend running on port ${PORT}`);
});
