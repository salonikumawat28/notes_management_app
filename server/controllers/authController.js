const { ValidationError } = require("../errors");
const authService = require("../services/authService");

// TODO: Add all request validations in login and signup.
// TODO: disconnect database by turning off internet and verify that authService signup and login handles the 500 errors as well.
async function signup(req, res, next) {
  // Validate request
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ValidationError("Name, Email and password are required."));
  }

  // Signup the user.
  authService
    .signup({ name, email, password })
    .then((authToken) => res.status(201).json({ authToken }))
    .catch((error) => next(error));
}

async function login(req, res, next) {
  // Validate request
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ValidationError("Email and password are required."));
  }

  // Login the user.
  authService
    .login({ email, password })
    .then((authToken) => res.status(200).json({ authToken }))
    .catch((error) => next(error));
}

const authController = {
  signup,
  login,
};

module.exports = authController;
