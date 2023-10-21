const usersModel = require("../models/usersModel");
const notesModel = require("../models/notesModel");
const _ = require('underscore');

/* Get users listing. */
async function getUsers(req, res, next) {
  const users = await usersModel.find({});
  res.send(users);
}

/* Get a specific user by ID. */
async function getUser(req, res, next) {
  const userId = req.params.id;
  const user = await usersModel.findById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

/* Create a new user. */
async function createUser(req, res, next) {
  try {
    console.log('Received POST request to /users');
    let newUser = req.body;
    if (!newUser.name || !newUser.email || !newUser.password) {
      res.status(400).json({ message: "Full information is required" });
      return;
    }
  
    const createdUser = await usersModel.create(newUser);
    console.error('Successfully processed POST request to /users. Created user is: ', createdUser);
    res.status(201).json(createdUser);
    return;
  } catch(error) {
    console.error('Error processing POST request to /users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
}

/*  Replace the user with new user data.
 */
async function replaceUser(req, res, next) {
  const userId = req.params.id;

  let newUser = req.body;
  newUser._id = userId;
  if (!newUser.name || !newUser.email || !newUser.password) {
    res.status(400).json({ message: "Full information is required" });
    return;
  }

  const replacedUser = await usersModel.findOneAndUpdate(
    { _id: userId },
    newUser,
    { new: true }
  );
  res.json(replacedUser);
}

/* Update the user with new user data.
 */
async function updateUser(req, res, next) {
  const userId = req.params.id;

  let userData = req.body;
  userData._id = userId;
  const updatedUser = await usersModel.findOneAndUpdate(
    { _id: userId },
    { $set: userData },
    { new: true }
  );
  res.json(updatedUser);
}

/* Delete a user by ID. */
async function deleteUser(req, res, next) {
  const userId = req.params.id;

  const deletedUser = await usersModel.findByIdAndDelete(userId);
  if (deletedUser) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "Unable to delete user" });
  }
}

const usersController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  replaceUser,
  deleteUser,
  getNotes,
};

module.exports = usersController;