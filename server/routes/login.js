var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

/* Login the user. */
router.post('/', usersController.login);

module.exports = router;
