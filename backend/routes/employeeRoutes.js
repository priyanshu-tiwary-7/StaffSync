const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees } = require('../controllers/employeeController');

// @route   POST /api/employees
router.post('/', addEmployee);

// @route   GET /api/employees
router.get('/', getEmployees);

module.exports = router;