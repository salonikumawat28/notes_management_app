var express = require("express");
const usersController = require("../controllers/usersController");
const authenticator = require("../middlewares/authenticator");
const requestPreProcessor = require("../middlewares/requestPreProcessor");
const requestValidator = require("../middlewares/requestValidator/validator");
var router = express.Router();

/* Return the current(who sent request) user */
router.get(
  "/me",
  requestPreProcessor.preProcessGetUser,
  requestValidator.validateGetUser,
  authenticator,
  usersController.getUser
);

/* Update the current with new user data.
 * Note: Patch method merges the new user data with existing user data.
 */
router.patch(
  "/me",
  requestPreProcessor.preProcessUpdateUser,
  requestValidator.validateUpdateUser,
  authenticator,
  usersController.updateUser
);

/* Updates the password of the current user. */
router.patch(
  "/me/password",
  requestPreProcessor.preProcessUpdatePassword,
  requestValidator.validateUpdatePassword,
  authenticator,
  usersController.updatePassword
);

/* Deletes the current user. */
router.delete(
  "/me",
  requestPreProcessor.preProcessDeleteUser,
  requestValidator.validateDeleteUser,
  authenticator,
  usersController.deleteUser
);

module.exports = router;
