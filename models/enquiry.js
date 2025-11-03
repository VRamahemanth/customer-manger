const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enquiry = sequelize.define('Enquiry', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  claimedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Enquiry;
