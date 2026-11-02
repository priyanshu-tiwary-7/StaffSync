const express = require('express');
const router = express.Router();
const { createTraining, getTrainings } = require('../controllers/trainingController');

router.post('/', createTraining);
router.get('/', getTrainings);

module.exports = router;