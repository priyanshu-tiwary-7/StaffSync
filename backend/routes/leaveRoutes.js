const express = require('express');
const router = express.Router();
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');

router.post('/', applyLeave);
router.get('/', getLeaves);
router.put('/:id', updateLeaveStatus);

module.exports = router;