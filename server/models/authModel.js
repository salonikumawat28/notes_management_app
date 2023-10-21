const usersModel = require("./usersModel");
const _ = require("underscore");
const consts = require("../config");
const jwt = require("jsonwebtoken");

async function signup({ name, email, password }) {
  // Step 1: Validation which involves database
  const userExists = usersModel.exists({ email });
  if (userExists) {
    return { error: "Email already exists." };
  }

  // Step 2: Encrypt the password.
  const encryptedPassword = await bcrypt.hash(password, /* saltRounds= */ 10);

  // Step 3: Create the user.
  // TODO: handle errors.
  const user = await usersModel.create({ name, email, encryptedPassword });

  // Step 4: Create access token.
  const tokenData = {
    userId: user._id,
  };
  const accessToken = jwt.sign(tokenData, consts.secretKey);
  return { accessToken };
}

async function login({ email, password }) {
  // Step 1: Validation which involves database
  const user = usersModel.findOne({ email });
  if (!!user) {
    return { error: "No such user found. Check credentials." };
  }

  // Step 2: Compare the password
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return { error: "No such user found. Check credentials." };
  }

  // Step 3: Create access token
  const tokenData = {
    userId: user._id
  }
  const accessToken = jwt.sign(tokenData, consts.secretKey);
  return { accessToken };
}

const authModel = {
  login,
  signup,
};
module.exports = authModel;
