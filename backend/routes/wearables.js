const express = require('express');
const router = express.Router();
const { storeData, getData } = require('../controllers/wearableController');
const { protect } = require('../middleware/auth');

router.post('/', protect, storeData);
router.get('/', protect, getData);

module.exports = router;
