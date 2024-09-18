const express = require('express');
const router = express.Router();
const guardianshipController = require('../controllers/guardianshipController.js');

router.get('/', guardianshipController.getAllGuardianships);
router.get('/:id', guardianshipController.getGuardianshipById);
router.post('/', guardianshipController.createGuardianship);
router.put('/:id', guardianshipController.updateGuardianship);
router.delete('/:id', guardianshipController.deleteGuardianship);

module.exports = router;
