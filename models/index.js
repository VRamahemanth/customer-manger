const { sequelize } = require('../config/database');
const Employee = require('./employee');
const Enquiry = require('./enquiry');

// Define relationships if needed
Employee.hasMany(Enquiry);
Enquiry.belongsTo(Employee);

module.exports = { sequelize, Employee, Enquiry };
