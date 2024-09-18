const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController.js');

// Роут для получения всех билетов с пагинацией
router.get('/', ticketController.getAllTickets);

// Роут для получения билета по ID
router.get('/:id', ticketController.getTicketById);

// Роут для создания нового билета
router.post('/', ticketController.createTicket);

// Роут для обновления билета по ID
router.put('/:id', ticketController.updateTicket);

// Роут для удаления билета по ID
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
