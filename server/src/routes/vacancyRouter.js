const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController.js');

// Роут для получения всех вакансий с пагинацией
router.get('/', vacancyController.getAllVacancies);

// Роут для получения одной вакансии по ID
router.get('/:id', vacancyController.getVacancyById);

// Роут для создания новой вакансии
router.post('/', vacancyController.createVacancy);

// Роут для обновления вакансии
router.put('/:id', vacancyController.updateVacancy);

// Роут для удаления вакансии
router.delete('/:id', vacancyController.deleteVacancy);

module.exports = router;
