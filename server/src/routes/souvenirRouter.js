const express = require('express');
const router = express.Router();
const souvenirController = require('../controllers/souvenirController.js');

// Роут для получения всех сувениров с пагинацией и фильтрацией по категории
router.get('/', souvenirController.getAllSouvenirs);

// Роут для получения сувенира по ID
router.get('/:id', souvenirController.getSouvenirById);

// Роут для создания нового сувенира
router.post('/', souvenirController.createSouvenir);

// Роут для обновления сувенира
router.put('/:id', souvenirController.updateSouvenir);

// Роут для удаления сувенира
router.delete('/:id', souvenirController.deleteSouvenir);

module.exports = router;
