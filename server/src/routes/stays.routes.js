const express = require('express');
const router = express.Router();
const stayController = require('../controllers/stay.controller');
// const authenticateToken = require('../middleware/auth.middleware'); // Optional for read

router.get('/', stayController.getAllStays);
router.get('/:id', stayController.getStayById);
router.post('/', stayController.createStay); // Should be protected in real app

module.exports = router;
