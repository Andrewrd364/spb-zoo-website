const express = require('express');
const router = express.Router();
const animalSpeciesController = require('../controllers/speciesController')

// Маршрут для получения всех видов животных
router.get('/', animalSpeciesController.getAllSpecies);

// Маршрут для получения вида животных по ID
router.get('/:id', animalSpeciesController.getSpeciesById);

// Маршрут для создания нового вида животных
router.post('/', animalSpeciesController.createSpecies);

// Маршрут для обновления вида животных по ID
router.put('/:id', animalSpeciesController.updateSpecies);

// Маршрут для удаления вида животных по ID
router.delete('/:id', animalSpeciesController.deleteSpecies);

module.exports = router;
