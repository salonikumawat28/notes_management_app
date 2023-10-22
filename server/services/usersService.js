const { InternalServerError, NotFoundError } = require("../errors");
const notesModel = require("../models/notesModel");
const usersModel = require("../models/usersModel");
const utils = require("../utils");

async function getUser(userId) {
  const user = await usersModel.findById(userId).select('_id name email');
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
}

async function updateUser(userDataToUpdate, userId) {
  const filteredUserDataToUpdate = utils.filterObjectFields(userDataToUpdate, ['name', 'email']);
  return await usersModel.findOneAndUpdate(
    { _id: userId },
    { $set: filteredUserDataToUpdate },
    { new: true }
  ).select('_id name email');
}

async function updatePassword(passwordToUpdate, userId) {
  const encryptedPassword = await bcrypt.hash(passwordToUpdate, /* saltRounds= */ 10);
  const updateUserResult = await usersModel.updateOne(
    { _id: userId },
    { $set: {password: encryptedPassword} },
  );
  console.log("updage user result: ", updateUserResult);
  return { message: "Password updated successfully" };
}

async function deleteUser(userId) {
  // Step 1: Delete all notes associated with the user
  const deleteNotesResult = await notesModel.deleteMany({ author: userId });
  if (!deleteNotesResult.deletedCount) {
    throw new InternalServerError("Unable to delete user's notes.");
  }

  // Step 2: Delete the user
  const deleteUserResult = await usersModel.deleteOne({ _id: userId });
  if (!deleteUserResult.deletedCount) {
    throw new NotFoundError("Unable to delete user.");
  }

  return { message: "User and associated notes deleted successfully" };
}

const usersService = {
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
};
module.exports = usersService;
