const express = require('express');
const router = express.Router();
const souvenirCategoryController = require('../controllers/souvenirCategoriesController.js');

// Роут для получения всех категорий сувениров
router.get('/', souvenirCategoryController.getAllSouvenirCategories);

// Роут для получения одной категории по ID
router.get('/:id', souvenirCategoryController.getSouvenirCategoryById);
router.put('/:id', souvenirCategoryController.updateSouvenirCategory);
router.post('/', souvenirCategoryController.createSouvenirCategory);
router.delete('/:id', souvenirCategoryController.deleteSouvenirCategory);

module.exports = router;
