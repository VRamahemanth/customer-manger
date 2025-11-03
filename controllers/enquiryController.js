const { Enquiry, Employee } = require('../models');

// 📨 Submit new enquiry (public route)
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const enquiry = await Enquiry.create({ name, email, message });
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting enquiry', error: error.message });
  }
};

// 📋 Get unclaimed enquiries (protected)
exports.getUnclaimedEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { employeeId: null } });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unclaimed enquiries', error: error.message });
  }
};

// ✋ Claim an enquiry (protected)
exports.claimEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByPk(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    if (enquiry.employeeId) {
      return res.status(400).json({ message: 'Enquiry already claimed' });
    }

    enquiry.employeeId = req.employee.id;
    await enquiry.save();

    res.status(200).json({ message: 'Enquiry claimed successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming enquiry', error: error.message });
  }
};

// 👤 Get my enquiries (protected)
exports.getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { employeeId: req.employee.id } });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your enquiries', error: error.message });
  }
};
