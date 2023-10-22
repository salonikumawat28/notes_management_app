const { UnauthorizedError } = require("../errors");
const usersService = require("../services/usersService");
const _ = require("underscore");

/* Get a specific user by ID. */
async function getUser(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Get user by id.
  usersService
    .getUser(req.authenticatedUserId)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

// TODO: while updating user or notes, just take those fields which we return.

/* Update the user with new user data.
 */
async function updateUser(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Validate request inputs.
  let userDataToUpdate = req.body;
  if (userDataToUpdate._id && userDataToUpdate._id !== req.authenticatedUserId) {
    return next(new ValidationError("User id doesn't match with URL user id."));
  }

  // Update the user.
  usersService
    .updateUser(userDataToUpdate, req.authenticatedUserId)
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => next(error));
}

async function updatePassword(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Validate request inputs.
  let {password} = req.body;
  if (!password) {
    return next(new ValidationError("No password given to update."));
  }

  // Update the user.
  usersService
    .updatePassword(password, req.authenticatedUserId)
    .then((response) => res.json(response))
    .catch((error) => next(error));
}

/* Deletes a user by ID. */
async function deleteUser(req, res, next) {
  // Sanity check if user authorized.
  if (!req.authenticatedUserId) {
    return next(new UnauthorizedError("No token provided"));
  }

  // Delete note.
  usersService
    .deleteUser(req.authenticatedUserId)
    .then((response) => res.json(response))
    .catch((error) => next(error));
}

const usersController = {
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
};

module.exports = usersController;
