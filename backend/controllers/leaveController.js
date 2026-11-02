const Leave = require('../models/Leave');

const applyLeave = async (req, res) => {
    try {
        const { user, startDate, endDate, reason } = req.body;
        const leave = await Leave.create({ user, startDate, endDate, reason });
        res.status(201).json({ message: 'Leave applied successfully', leave });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getLeaves = async (req, res) => {
    try {
        // If a userId is passed in the query, only get leaves for that user
        const filter = req.query.userId ? { user: req.query.userId } : {};
        const leaves = await Leave.find(filter).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { status, approverRole } = req.body;
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status, approverRole }, { new: true });
        if (!leave) return res.status(404).json({ message: 'Leave not found' });
        res.json({ message: `Leave ${status}`, leave });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };