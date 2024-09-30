const express = require('express');
const router = express.Router();
const souvenirController = require('../controllers/souvenirController.js');

router.get('/', souvenirController.getAllSouvenirs);
router.get('/:id', souvenirController.getSouvenirById);
router.post('/', souvenirController.createSouvenir);
router.put('/:id', souvenirController.updateSouvenir);
router.delete('/:id', souvenirController.deleteSouvenir);

module.exports = router;
