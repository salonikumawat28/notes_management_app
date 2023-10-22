const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UnauthorizedError, ConflictError } = require("../errors");
const usersModel = require("../models/usersModel");

async function signup({ name, email, password }) {
  // Data validation (which involves database)
  const userExists = await usersModel.exists({ email });
  if (userExists) {
    throw new ConflictError("Email already exists.");
  }

  // Encrypt the password.
  const encryptedPassword = await bcrypt.hash(password, /* saltRounds= */ 10);

  // Create the user.
  const user = await usersModel.create({
    name,
    email,
    password: encryptedPassword,
  });

  // Create auth token.
  const tokenData = {
    userId: user._id,
  };
  const authToken = jwt.sign(tokenData, config.secretKey);
  return authToken;
}

async function login({ email, password }) {
  // Data validation (which involves database)
  const user = await usersModel.findOne({ email }).select('_id password');
  if (!user) {
    throw new UnauthorizedError("Invalid credentials.");
  }

  // Compare the password
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    throw new UnauthorizedError("Invalid credentials.");
  }

  // Create auth token
  const tokenData = {
    userId: user._id,
  };
  const authToken = jwt.sign(tokenData, config.secretKey);
  return authToken;
}

const authService = {
  login,
  signup,
};
module.exports = authService;
