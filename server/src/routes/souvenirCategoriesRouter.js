const express = require('express');
const router = express.Router();
const souvenirCategoryController = require('../controllers/souvenirCategoriesController.js');

router.get('/', souvenirCategoryController.getAllSouvenirCategories);
router.get('/:id', souvenirCategoryController.getSouvenirCategoryById);
router.put('/:id', souvenirCategoryController.updateSouvenirCategory);
router.post('/', souvenirCategoryController.createSouvenirCategory);
router.delete('/:id', souvenirCategoryController.deleteSouvenirCategory);

module.exports = router;
