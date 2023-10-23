const utils = require("../utils/utils");

function preProcessSignup(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["name", "email", "password"]);

  // Trim values.
  utils.trimFields(req.body, ["name", "email"]);

  // Convert to lower case.
  utils.convertFieldsToLowerCase(req.body, ["email"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessLogin(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["email", "password"]);

  // Trim values.
  utils.trimFields(req.body, ["email"]);

  // Convert to lower case.
  utils.convertFieldsToLowerCase(req.body, ["email"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessGetUser(req, res, next) {
  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessUpdateUser(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["name", "email"]);

  // Trim values.
  utils.trimFields(req.body, ["name", "email"]);

  // Convert to lower case.
  utils.convertFieldsToLowerCase(req.body, ["email"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessUpdatePassword(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["password"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessDeleteUser(req, res, next) {
  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessGetNotes(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["password"]);
  req.query = utils.filterFields(req.query, ["search"]);

  // Trim values.
  utils.trimFields(req.query, ["search"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessGetNote(req, res, next) {
  // Trim values.
  utils.trimFields(req.params, ["id"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessCreateNote(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["title", "content"]);

  // Trim values.
  utils.trimFields(req.body, ["title", "content"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessUpdateNote(req, res, next) {
  // Remove all fields except what we need.
  req.body = utils.filterFields(req.body, ["title", "content"]);

  // Trim values.
  utils.trimFields(req.body, ["title", "content"]);
  utils.trimFields(req.params, ["id"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

function preProcessDeleteNote(req, res, next) {
  // Trim values.
  utils.trimFields(req.params, ["id"]);

  // Set preProcessing success and move to next middleware.
  req.preProcessed = true;
  next();
}

// Note: pre process request usually does three things: 1. Sanitization 2. Set default values 3. Type conversion.
module.exports = {
  preProcessSignup,
  preProcessLogin,
  preProcessGetUser,
  preProcessUpdateUser,
  preProcessUpdatePassword,
  preProcessDeleteUser,
  preProcessGetNotes,
  preProcessGetNote,
  preProcessCreateNote,
  preProcessUpdateNote,
  preProcessDeleteNote,
};
