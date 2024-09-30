const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/:id', eventController.getEventById);

module.exports = router;
