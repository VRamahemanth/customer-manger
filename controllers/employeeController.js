const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models'); // from models/index.js

// ✅ Register new employee
exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee (removed role because it's not in DB)
    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Employee registered successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employee', error: error.message });
  }
};

// ✅ Employee login
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // No role column, so removed it from token
    const token = jwt.sign(
      { id: employee.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      employee: { id: employee.id, name: employee.name, email: employee.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// ✅ Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ['id', 'name', 'email'] // removed 'role'
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error: error.message });
  }
};

// ✅ Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

// ✅ Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body; // removed role
    const [updated] = await Employee.update({ name, email }, { where: { id } });

    if (updated === 0) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

// ✅ Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};
