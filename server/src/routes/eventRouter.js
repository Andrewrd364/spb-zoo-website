const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');

// Получить все события с пагинацией
router.get('/', eventController.getAllEvents);

// Создать новое событие
router.post('/', eventController.createEvent);

// Обновить событие
router.put('/:id', eventController.updateEvent);

// Удалить событие
router.delete('/:id', eventController.deleteEvent);

// Получить событие по id
router.get('/:id', eventController.getEventById);

module.exports = router;
