const Training = require('../models/Training');

// @desc    Create a training program
// @route   POST /api/trainings
const createTraining = async (req, res) => {
    try {
        const { title, description, date, trainer, createdBy, assignedTo } = req.body;
        const training = await Training.create({
            title, description, date, trainer, createdBy, assignedTo
        });
        res.status(201).json({ message: 'Training created successfully', training });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all trainings
// @route   GET /api/trainings
const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find().populate('createdBy', 'name').sort({ createdAt: -1 });
        res.json(trainings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createTraining, getTrainings };