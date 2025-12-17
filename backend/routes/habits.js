const express = require('express');
const router = express.Router();
const {
    createHabit,
    completeHabit,
    getHabits,
    updateHabit,
    deleteHabit
} = require('../controllers/habitController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createHabit);
router.get('/', protect, getHabits);
router.post('/:id/complete', protect, completeHabit);

// NEW
router.put('/:id', protect, updateHabit);
router.delete('/:id', protect, deleteHabit);

module.exports = router;
