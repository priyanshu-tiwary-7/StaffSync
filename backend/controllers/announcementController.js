const Announcement = require('../models/Announcement');

// @desc    Create an announcement
// @route   POST /api/announcements
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, targetAudience, createdBy } = req.body;

        const announcement = await Announcement.create({
            title, message, targetAudience, createdBy
        });

        res.status(201).json({ message: 'Announcement posted', announcement });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all announcements
// @route   GET /api/announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 }).populate('createdBy', 'name');
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createAnnouncement, getAnnouncements };