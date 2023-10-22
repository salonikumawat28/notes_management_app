var express = require('express');
const usersController = require('../controllers/usersController');
const authenticateJWT = require('../middlewares/authenticateJwt');
var router = express.Router();

/* Return the current(who sent request) user */
router.get('/me', authenticateJWT, usersController.getUser);

/* Update the current with new user data.
* Note: Patch method merges the new user data with existing user data.
*/
router.patch('/me', authenticateJWT, usersController.updateUser);

/* Updates the password of the current user. */
router.delete('/me/password', authenticateJWT, usersController.updatePassword);

/* Deletes the current user. */
router.delete('/me', authenticateJWT, usersController.deleteUser);

module.exports = router;
