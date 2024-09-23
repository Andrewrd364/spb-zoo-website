const express = require('express');
const { userLogin } = require('../controllers/userController.js');
const router = express.Router();

router.post('/login', userLogin);

module.exports = router;
