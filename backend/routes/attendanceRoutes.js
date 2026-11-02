const express = require('express');
const router = express.Router();
const { getAttendance, markAttendance } = require('../controllers/attendanceController');

router.get('/', getAttendance);
router.post('/', markAttendance); // ADD THIS

module.exports = router;