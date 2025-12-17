const express = require('express');
const router = express.Router();
const { analyzeLatestJournal } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.get('/analyze-latest', protect, analyzeLatestJournal);

module.exports = router;
