const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');

// Роут для получения всех услуг с пагинацией
router.get('/', serviceController.getAllServices);

// Роут для получения услуги по ID
router.get('/:id', serviceController.getServiceById);

// Роут для создания новой услуги
router.post('/', serviceController.createService);

// Роут для обновления услуги по ID
router.put('/:id', serviceController.updateService);

// Роут для удаления услуги по ID
router.delete('/:id', serviceController.deleteService);

module.exports = router;
