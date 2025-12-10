const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attraction.controller');

router.get('/', attractionController.getAllAttractions);
router.get('/:id', attractionController.getAttractionById);
router.post('/', attractionController.createAttraction);

module.exports = router;
