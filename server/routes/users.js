var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

/* Get users listing. */
router.get('/', usersController.getUsers);

/* Get a specific user by ID. */
router.get('/:id', usersController.getUser);

/* Create a new user. */
router.post('/', usersController.createUser);

/*  Update the user with new user data. 
* Note: Put method entirely replaces existing user data with new user data.
*/
router.put('/:id', usersController.replaceUser);

/* Update the user with new user data.
* Note: Patch method merges the new user data with existing user data.
*/
router.patch('/:id', usersController.updateUser);

/* Delets a user by ID. */
router.delete('/:id', usersController.deleteUser);

module.exports = router;
