const { expect } = require("chai");
const sinon = require("sinon");
const { NotFoundError, InternalServerError } = require("../../errors/errors");
const bcrypt = require("bcrypt");
const usersService = require("../../services/usersService");
const usersModel = require("../../models/usersModel");
const notesModel = require("../../models/notesModel");

describe("User Service", () => {
  // Restore stubs after tests are complete
  afterEach(() => {
    sinon.restore();
  });

  describe("getUser", () => {
    it("should return a user", async () => {
      const userId = "existingUserId";

      // Stubbing usersModel.findById to return a user
      sinon.stub(usersModel, "findById").returns({
        select: sinon.stub().resolves({
          _id: userId,
          name: "Test User",
          email: "test@example.com",
        }),
      });

      const result = await usersService.getUser(userId);

      sinon.assert.calledWith(usersModel.findById, userId);

      expect(result).to.be.an("object");
      expect(result).to.have.property("_id", userId);
    });

    it("should throw NotFoundError when user is not found", async () => {
      const nonExistentUserId = "nonExistentUserId";

      // Stubbing usersModel.findById to simulate user not found
      sinon.stub(usersModel, "findById").returns({
        select: sinon.stub().resolves(null),
      });

      // Use chai's expect to assert the error
      await expect(usersService.getUser(nonExistentUserId)).to.be.rejectedWith(
        NotFoundError,
        "User not found."
      );
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const userDataToUpdate = {
        name: "Updated Test User",
        email: "updated@test.com",
      };
      const userId = "existingUserId";

      // Stubbing usersModel.findOneAndUpdate to return the updated user
      sinon.stub(usersModel, "findOneAndUpdate").returns({
        select: sinon.stub().resolves({
          _id: userId,
          name: userDataToUpdate.name,
          email: userDataToUpdate.email,
        }),
      });

      const result = await usersService.updateUser(userDataToUpdate, userId);

      sinon.assert.calledWith(
        usersModel.findOneAndUpdate,
        { _id: userId },
        { $set: userDataToUpdate },
        { new: true }
      );

      expect(result).to.be.an("object");
      expect(result).to.have.property("_id", userId);
      expect(result).to.have.property("name", userDataToUpdate.name);
    });

    describe("updatePassword", () => {
      it("should update user's password", async () => {
        const passwordToUpdate = "newPassword";
        const userId = "existingUserId";

        // Stubbing bcrypt.hash to return an encrypted password
        sinon.stub(bcrypt, "hash").resolves("encryptedPassword");

        // Stubbing usersModel.updateOne to return a modified user
        sinon.stub(usersModel, "updateOne").resolves({ modifiedCount: 1 });

        const result = await usersService.updatePassword(
          passwordToUpdate,
          userId
        );

        sinon.assert.calledWith(bcrypt.hash, passwordToUpdate, 10);
        sinon.assert.calledWith(
          usersModel.updateOne,
          { _id: userId },
          { $set: { password: "encryptedPassword" } }
        );

        expect(result).to.deep.equal({
          message: "Password updated successfully",
        });
      });

      it("should handle unable to update user's password", async () => {
        const passwordToUpdate = "newPassword";
        const nonExistentUserId = "nonExistentUserId";

        // Stubbing bcrypt.hash to return an encrypted password
        sinon.stub(bcrypt, "hash").resolves("encryptedPassword");

        // Stubbing usersModel.updateOne to simulate failure to update user's password
        sinon.stub(usersModel, "updateOne").resolves({ modifiedCount: 0 });

        // Use chai's expect to assert the error
        await expect(
          usersService.updatePassword(passwordToUpdate, nonExistentUserId)
        ).to.be.rejectedWith(
          InternalServerError,
          "Unable to update user's password."
        );
      });

      // Additional tests for other failure scenarios
    });

    describe("deleteUser", () => {
      it("should delete user and associated notes", async () => {
        const userId = "existingUserId";

        // Stubbing notesModel.deleteMany to return a result
        sinon.stub(notesModel, "deleteMany").resolves({ deletedCount: 2 });

        // Stubbing usersModel.deleteOne to return a result
        sinon.stub(usersModel, "deleteOne").resolves({ deletedCount: 1 });

        const result = await usersService.deleteUser(userId);

        sinon.assert.calledWith(notesModel.deleteMany, { author: userId });
        sinon.assert.calledWith(usersModel.deleteOne, { _id: userId });

        expect(result).to.deep.equal({
          message: "User and associated notes deleted successfully",
        });
      });

      it("should handle unable to delete user's notes", async () => {
        const nonExistentUserId = "nonExistentUserId";

        // Stubbing notesModel.deleteMany to simulate failure to delete user's notes
        sinon.stub(notesModel, "deleteMany").resolves({ deletedCount: 0 });

        // Use chai's expect to assert the error
        await expect(
          usersService.deleteUser(nonExistentUserId)
        ).to.be.rejectedWith(
          InternalServerError,
          "Unable to delete user's notes."
        );
      });

      it("should handle unable to delete user", async () => {
        const nonExistentUserId = "nonExistentUserId";

        // Stubbing notesModel.deleteMany to return a result
        sinon.stub(notesModel, "deleteMany").resolves({ deletedCount: 2 });

        // Stubbing usersModel.deleteOne to simulate failure to delete user
        sinon.stub(usersModel, "deleteOne").resolves({ deletedCount: 0 });

        // Use chai's expect to assert the error
        await expect(
          usersService.deleteUser(nonExistentUserId)
        ).to.be.rejectedWith(NotFoundError, "Unable to delete user.");
      });

      // Additional tests for other failure scenarios
    });
  });
});
