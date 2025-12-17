const express = require('express');
const router = express.Router();
const { createPost, listPosts, toggleLike } = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createPost);
router.get('/', protect, listPosts);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
