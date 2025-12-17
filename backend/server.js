require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimiter');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiter (basic)
app.use(rateLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/moods', require('./routes/moods'));
app.use('/api/habits', require('./routes/habits'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/community', require('./routes/community'));
app.use('/api/wearables', require('./routes/wearables'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/overview', require('./routes/overview'));


// Error handler
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`MindBloom backend running on port ${PORT}`);
});
