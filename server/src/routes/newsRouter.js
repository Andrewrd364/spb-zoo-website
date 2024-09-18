const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController.js');

// Получить все новости с пагинацией и фильтрацией по категории
router.get('/', newsController.getAllNews);

// Создать новость
router.post('/', newsController.createNews);

// Обновить новость
router.put('/:id', newsController.updateNews);

// Удалить новость
router.delete('/:id', newsController.deleteNews);

// Получить новость по id
router.get('/:id', newsController.getNewsById);

module.exports = router;
