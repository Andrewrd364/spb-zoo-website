const express = require('express');
const router = express.Router();
const newsCategoryController = require('../controllers/newsCategoriesController.js');

// Роут для получения всех категорий новостей
router.get('/', newsCategoryController.getAllNewsCategories);

module.exports = router;
