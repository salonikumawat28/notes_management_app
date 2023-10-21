var express = require('express');
const authController = require('../controllers/authController');
var router = express.Router();

/* Login the user. */
router.post('/login', authController.login);

/* Signup the user */
router.post('signup', authController.signup);

module.exports = router;
