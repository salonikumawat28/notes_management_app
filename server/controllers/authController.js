const { InternalServerError } = require("../errors/errors");
const authService = require("../services/authService");

async function signUp(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  // Signup the user.
  authService
    .signUp(req.body)
    .then((authToken) => res.status(201).json({ authToken }))
    .catch((error) => next(error));
}

async function login(req, res, next) {
  // Sanity check if request went through all middlewares.
  if (!req.validated) {
    return next(
      new InternalServerError(
        "Unexpected state - Request is expected to be validated before coming in controller."
      )
    );
  }

  // Login the user.
  authService
    .login(req.body)
    .then((authToken) => res.status(200).json({ authToken }))
    .catch((error) => next(error));
}

const authController = {
  signUp,
  login,
};

module.exports = authController;
