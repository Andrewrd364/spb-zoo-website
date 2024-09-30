const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController.js');

router.get('/', newsController.getAllNews);
router.post('/', newsController.createNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);
router.get('/:id', newsController.getNewsById);

module.exports = router;
