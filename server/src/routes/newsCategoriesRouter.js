const express = require('express');
const router = express.Router();
const newsCategoryController = require('../controllers/newsCategoriesController.js');

router.get('/', newsCategoryController.getAllNewsCategories);
router.post('/', newsCategoryController.addNewsCategory);
router.put('/:id', newsCategoryController.updateNewsCategory);
router.delete('/:id', newsCategoryController.deleteNewsCategory);

module.exports = router;
