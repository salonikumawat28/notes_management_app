const authModel = require("../models/authModel");

async function signup(req, res, next) {
  // Step 1 : Request input Validation
  const { name, email, password } = req.body;
  // TODO: other validations on raw input like valid email, strong password etc.
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, Email and password are required." });
  }

  // Step 2: Signup the user.
  const { accessToken, error } = await authModel.signup({ name, email, password });
  if (!!error) {
    return res.status(403).json({ error: "Unable to create account." });
  }

  // Step 3: Send access token in response.
  res.status(201).json({accessToken});
}

async function login(req, res, next) {
  // Step 1 : Request input Validation
  const { email, password } = req.body;
  // TODO: other validations on raw input like valid email, strong password etc.
  if (!email || !password) {
    return res
      .status(401)
      .json({ error: "Email and password are required." });
  }

  // Step 2: Login the user.
  const { accessToken, error } = await authModel.login({ email, password });
  if (!!error) {
    return res.status(403).json({ error: "Unable to login. Check credentials." });
  }

  // Step 3: Send access token in response.
  res.status(201).json({accessToken});
}

// /* login a user */
// async function login(req, res, next) {
//     //console.log("**** Trying to login user");
//     const { email, password } = req.body;
//     //console.log("**** body is: ", req.body);
//     const user = await authModel.login({ email, password });
//     //const user = {name: "temp", email: "temp@gmail.com", password: "111111"};
//     if (!_.isEmpty(user)) {
//       console.log("**** user is: ", user);
//       res.json(user);
//     } else {
//       console.log("**** user failed to login");
//       res
//         .status(404)
//         .json({ message: "Login failed. Check email and password." });
//     }
//   }

const authController = {
  signup,
  login,
};

module.exports = authController;
