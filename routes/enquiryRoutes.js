const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const authMiddleware = require('../middlewares/auth');

// Public route — anyone can submit enquiry
router.post('/submit', enquiryController.submitEnquiry);

// Protected routes — only logged-in employees can access
router.get('/unclaimed', authMiddleware, enquiryController.getUnclaimedEnquiries);
router.post('/:id/claim', authMiddleware, enquiryController.claimEnquiry);
router.get('/my', authMiddleware, enquiryController.getMyEnquiries);

module.exports = router;
