const sinon = require("sinon");
const { InternalServerError } = require("../../errors/errors");
const usersService = require("../../services/usersService");
const usersController = require("../../controllers/usersController");

describe("Users Controller", () => {
  describe("getUser", () => {
    it("should return a user on successful getUser", async () => {
      const req = { authenticatedUserId: "userId", validated: true };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the getUser function from usersService to return a mock user
      sinon.stub(usersService, "getUser").resolves({ username: "john_doe", email: "john@example.com" });

      await usersController.getUser(req, res, next);

      // Verify that res.json is called with the expected user
      sinon.assert.calledWith(res.json, { username: "john_doe", email: "john@example.com" });

      // Restore the stubbed function to its original implementation
      usersService.getUser.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await usersController.getUser(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InternalServerError));
    });
  });

  describe("updateUser", () => {
    it("should update the user and return it on successful updateUser", async () => {
      const req = {
        authenticatedUserId: "userId",
        validated: true,
        body: { username: "new_username", email: "new_email@example.com" },
      };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the updateUser function from usersService to return a mock updated user
      sinon.stub(usersService, "updateUser").resolves({ username: "new_username", email: "new_email@example.com" });

      await usersController.updateUser(req, res, next);

      // Verify that res.json is called with the expected updated user
      sinon.assert.calledWith(res.json, { username: "new_username", email: "new_email@example.com" });

      // Restore the stubbed function to its original implementation
      usersService.updateUser.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await usersController.updateUser(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InternalServerError));
    });
  });

  describe("updatePassword", () => {
    it("should update the user password and return a response on successful updatePassword", async () => {
      const req = { authenticatedUserId: "userId", validated: true, body: { password: "new_password" } };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the updatePassword function from usersService to return a mock response
      sinon.stub(usersService, "updatePassword").resolves({ message: "Password updated successfully" });

      await usersController.updatePassword(req, res, next);

      // Verify that res.json is called with the expected response
      sinon.assert.calledWith(res.json, { message: "Password updated successfully" });

      // Restore the stubbed function to its original implementation
      usersService.updatePassword.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await usersController.updatePassword(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InternalServerError));
    });
  });

  describe("deleteUser", () => {
    it("should delete the user and return a response on successful deleteUser", async () => {
      const req = { authenticatedUserId: "userId", validated: true };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the deleteUser function from usersService to return a mock response
      sinon.stub(usersService, "deleteUser").resolves({ message: "User deleted successfully" });

      await usersController.deleteUser(req, res, next);

      // Verify that res.json is called with the expected response
      sinon.assert.calledWith(res.json, { message: "User deleted successfully" });

      // Restore the stubbed function to its original implementation
      usersService.deleteUser.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await usersController.deleteUser(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InternalServerError));
    });
  });
});