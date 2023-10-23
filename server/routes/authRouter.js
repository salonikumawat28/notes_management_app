var express = require("express");
const authController = require("../controllers/authController");
const requestValidator = require("../middlewares/requestValidator/validator");
const requestPreProcessor = require("../middlewares/requestPreProcessor");
var router = express.Router();

/* Login the user. */
router.post(
  "/login",
  requestPreProcessor.preProcessLogin,
  requestValidator.validateLogin,
  authController.login
);

/* Signup the user */
router.post(
  "/signup",
  requestPreProcessor.preProcessSignup,
  requestValidator.validateSignup,
  authController.signUp
);

module.exports = router;
