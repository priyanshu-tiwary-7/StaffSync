const Employee = require('../models/Employee');

// @desc    Add a new employee
// @route   POST /api/employees
const addEmployee = async (req, res) => {
    try {
        const { name, email, department, position, salary, joinDate, phone, address } = req.body;

        // Check if employee email exists
        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        const employee = await Employee.create({
            name, email, department, position, salary, joinDate, phone, address
        });

        res.status(201).json({ message: 'Employee added successfully', employee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all employees
// @route   GET /api/employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addEmployee, getEmployees };