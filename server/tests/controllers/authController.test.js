const sinon = require("sinon");
const authController = require("../../controllers/authController");
const authService = require("../../services/authService");
const { InternalServerError } = require("../../errors/errors");

describe("Auth Controller", () => {
  describe("signUp", () => {
    it("should return a 201 status and a valid authToken on successful signUp", async () => {
      const req = { body: {}, validated: true };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      // Stub the signUp function from authService to return a mock authToken
      sinon.stub(authService, "signUp").resolves("mockAuthToken");

      await authController.signUp(req, res, next);

      // Verify that the response status is 201 and the json method is called with the expected data
      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, { authToken: "mockAuthToken" });

      // Restore the stubbed function to its original implementation
      authService.signUp.restore();
    });

    it("should call next with an InternalServerError if request is not validated", async () => {
      const req = { body: {}, validated: false };
      const res = {};
      const next = sinon.stub();

      await authController.signUp(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InternalServerError));
    });
  });

  describe("login", () => {
    it("should return a 200 status and a valid authToken on successful login", async () => {
      const req = { body: { }, validated: true };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      // Stub the login function from authService to return a mock authToken
      sinon.stub(authService, "login").resolves("mockAuthToken");

      await authController.login(req, res, next);

      // Verify that the response status is 200 and the json method is called with the expected data
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, { authToken: "mockAuthToken" });

      // Restore the stubbed function to its original implementation
      authService.login.restore();
    });

    it("should call next with an InternalServerError if request is not validated", async () => {
      const req = { body: { }, validated: false };
      const res = {};
      const next = sinon.stub();

      await authController.login(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InternalServerError));
    });
  });
});
