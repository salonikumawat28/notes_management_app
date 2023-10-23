const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UnauthorizedError, ConflictError } = require("../../errors/errors");
const config = require("../../configs/config");
const usersModel = require("../../models/usersModel");
const authService = require("../../services/authService");

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Auth Service", () => {
  describe("signUp", () => {
    it("should create a new user and return an auth token on successful signUp", async () => {
      const userData = {
        name: "Saloni Kumawat",
        email: "saloni@example.com",
        password: "password123",
      };

      // Stub the necessary functions from usersModel and bcrypt
      sinon.stub(usersModel, "exists").resolves(false);
      sinon.stub(usersModel, "create").resolves({ _id: "userId" });
      sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      sinon.stub(jwt, "sign").returns("mockAuthToken");

      const authToken = await authService.signUp(userData);

      // Verify that the necessary functions are called with the expected arguments
      sinon.assert.calledWith(usersModel.exists, {
        email: "saloni@example.com",
      });
      sinon.assert.calledWith(usersModel.create, {
        name: "Saloni Kumawat",
        email: "saloni@example.com",
        password: "hashedPassword",
      });
      sinon.assert.calledWith(bcrypt.hash, "password123", 10);
      sinon.assert.calledWith(jwt.sign, { userId: "userId" }, config.secretKey);

      // Verify that the returned auth token is as expected
      expect(authToken).to.equal("mockAuthToken");

      // Restore the stubbed functions to their original implementations
      usersModel.exists.restore();
      usersModel.create.restore();
      bcrypt.hash.restore();
      jwt.sign.restore();
    });

    it("should throw ConflictError if user with the same email already exists", async () => {
      const userData = {
        name: "Saloni Kumawat",
        email: "saloni@example.com",
        password: "password123",
      };

      // Stub the exists function from usersModel to simulate an existing user
      sinon.stub(usersModel, "exists").resolves(true);

      // Expect the signUp function to throw a ConflictError
      await expect(authService.signUp(userData)).to.be.rejectedWith(
        ConflictError,
        "Email already exists."
      );

      // Restore the stubbed function to its original implementation
      usersModel.exists.restore();
    });
  });

  describe("login", () => {
    it("should return an auth token on successful login", async () => {
      const credentials = {
        email: "saloni@example.com",
        password: "password123",
      };

      // Stub the necessary functions from usersModel, bcrypt, and jwt
      sinon.stub(usersModel, "findOne").returns({
        select: sinon
          .stub()
          .resolves({ _id: "userId", password: "hashedPassword" }),
      });
      sinon.stub(bcrypt, "compare").resolves(true);
      sinon.stub(jwt, "sign").returns("mockAuthToken");

      const authToken = await authService.login(credentials);

      // Verify that the necessary functions are called with the expected arguments
      sinon.assert.calledWith(usersModel.findOne, {
        email: "saloni@example.com",
      });
      sinon.assert.calledWith(bcrypt.compare, "password123", "hashedPassword");
      sinon.assert.calledWith(jwt.sign, { userId: "userId" }, config.secretKey);

      // Verify that the returned auth token is as expected
      expect(authToken).to.equal("mockAuthToken");

      // Restore the stubbed functions to their original implementations
      usersModel.findOne.restore();
      bcrypt.compare.restore();
      jwt.sign.restore();
    });

    it("should throw UnauthorizedError if user with the given email does not exist", async () => {
      const credentials = {
        email: "saloni@example.com",
        password: "password123",
      };

      // Stub the findOne function from usersModel to simulate a non-existing user
      sinon.stub(usersModel, "findOne").returns({
        select: sinon.stub().resolves(null),
      });

      // Expect the login function to throw an UnauthorizedError
      await expect(authService.login(credentials)).to.be.rejectedWith(
        UnauthorizedError,
        "Invalid credentials."
      );

      // Restore the stubbed function to its original implementation
      usersModel.findOne.restore();
    });

    it("should throw UnauthorizedError if the password does not match", async () => {
      const credentials = {
        email: "saloni@example.com",
        password: "password123",
      };

      // Stub the findOne function from usersModel to simulate an existing user
      sinon.stub(usersModel, "findOne").returns({
        select: sinon
          .stub()
          .resolves({ _id: "userId", password: "hashedPassword" }),
      });

      // Stub the compare function from bcrypt to simulate a failed password match
      sinon.stub(bcrypt, "compare").resolves(false);

      // Expect the login function to throw an UnauthorizedError
      await expect(authService.login(credentials)).to.be.rejectedWith(
        UnauthorizedError,
        "Invalid credentials."
      );

      // Restore the stubbed functions to their original implementations
      usersModel.findOne.restore();
      bcrypt.compare.restore();
    });
  });
});
