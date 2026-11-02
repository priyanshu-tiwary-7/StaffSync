const Attendance = require('../models/Attendance');

const getAttendance = async (req, res) => {
    try {
        const filter = req.query.userId ? { user: req.query.userId } : {};
        const records = await Attendance.find(filter).populate('user', 'name email').sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const markAttendance = async (req, res) => {
    try {
        const { user, status } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight to compare dates

        // Check if attendance is already marked for today
        let record = await Attendance.findOne({ 
            user, 
            date: { $gte: today } 
        });

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (record) {
            // If they already checked in, this is a Check Out
            record.checkOutTime = currentTime;
            await record.save();
            return res.json({ message: 'Checked out successfully', record });
        }

        // Otherwise, create a new Check In record
        record = await Attendance.create({
            user,
            date: new Date(),
            checkInTime: currentTime,
            status: status || 'Present'
        });

        res.status(201).json({ message: 'Checked in successfully', record });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAttendance, markAttendance };