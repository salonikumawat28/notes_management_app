const { InternalServerError, NotFoundError } = require("../errors/errors");
const notesModel = require("../models/notesModel");
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

async function getUser(userId) {
  const user = await usersModel.findById(userId).select('_id name email');
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
}

async function updateUser(userDataToUpdate, userId) {
  return await usersModel.findOneAndUpdate(
    { _id: userId },
    { $set: userDataToUpdate },
    { new: true }
  ).select('_id name email');
}

async function updatePassword(passwordToUpdate, userId) {
  const encryptedPassword = await bcrypt.hash(passwordToUpdate, /* saltRounds= */ 10);
  const updateUserResult = await usersModel.updateOne(
    { _id: userId },
    { $set: {password: encryptedPassword} },
  );
  if (!updateUserResult.modifiedCount) {
    throw new InternalServerError("Unable to update user's password.");
  }
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
