const { InternalServerError } = require("../errors/errors");
const usersService = require("../services/usersService");

/* Get a specific user by ID. */
async function getUser(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
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
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  // Update the user.
  let userDataToUpdate = req.body;
  usersService
    .updateUser(userDataToUpdate, req.authenticatedUserId)
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => next(error));
}

async function updatePassword(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  // Update the user password.
  let { password } = req.body;
  usersService
    .updatePassword(password, req.authenticatedUserId)
    .then((response) => res.json(response))
    .catch((error) => next(error));
}

/* Deletes a user by ID. */
async function deleteUser(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.authenticatedUserId || !req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
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
