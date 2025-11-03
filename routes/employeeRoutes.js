const express = require('express');
const router = express.Router();
const { registerEmployee, loginEmployee , getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee} = require('../controllers/employeeController');

// Register new employee
router.post('/register', registerEmployee);

// Employee login
router.post('/login', loginEmployee);

router.get('/', getAllEmployees);

router.get('/:id', getEmployeeById);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;
