const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController.js');

router.get('/', vacancyController.getAllVacancies);
router.get('/:id', vacancyController.getVacancyById);
router.post('/', vacancyController.createVacancy);
router.put('/:id', vacancyController.updateVacancy);
router.delete('/:id', vacancyController.deleteVacancy);

module.exports = router;
