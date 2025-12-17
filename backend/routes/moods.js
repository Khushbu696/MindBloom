const express = require('express');
const router = express.Router();
const { createMood, getMyMoods, uploadVoice, deleteMood } = require('../controllers/moodController');
const { protect } = require('../middleware/auth');

router.post('/', protect, uploadVoice, createMood); // form-data: voiceNote file optional
router.get('/', protect, getMyMoods);
router.delete("/:id", protect, deleteMood);

module.exports = router;
