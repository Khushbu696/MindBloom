const express = require('express');
const router = express.Router();
const { listRewards, claimReward } = require('../controllers/rewardController');
const { protect } = require('../middleware/auth');

router.get('/', protect, listRewards);
router.post('/:id/claim', protect, claimReward);

module.exports = router;
