const sinon = require("sinon");
const { InternalServerError } = require("../../errors/errors");
const notesService = require("../../services/notesService");
const notesController = require("../../controllers/notesController");

describe("Notes Controller", () => {
  describe("getNotes", () => {
    it("should return a list of notes on successful getNotes", async () => {
      const req = { authenticatedUserId: "userId", validated: true, query: {} };
      const res = { send: sinon.stub() };
      const next = sinon.stub();

      // Stub the getNotes function from notesService to return a mock list of notes
      sinon.stub(notesService, "getNotes").resolves([
        { title: "note1", content: "Note content 1" },
        { title: "note2", content: "Note content 2" },
      ]);

      await notesController.getNotes(req, res, next);

      // Verify that res.send is called with the expected list of notes
      sinon.assert.calledWith(res.send, [
        { title: "note1", content: "Note content 1" },
        { title: "note2", content: "Note content 2" },
      ]);

      // Restore the stubbed function to its original implementation
      notesService.getNotes.restore();
    });

    it("should return a list of notes on successful searchNotes", async () => {
      const req = {
        authenticatedUserId: "userId",
        validated: true,
        query: { search: "keyword" },
      };
      const res = { send: sinon.stub() };
      const next = sinon.stub();

      // Stub the searchNotes function from notesService to return a mock list of notes
      sinon.stub(notesService, "searchNotes").resolves([
        { title: "note1", content: "Note content 1" },
        { title: "note2", content: "Note content 2" },
      ]);

      await notesController.getNotes(req, res, next);

      // Verify that res.send is called with the expected list of notes
      sinon.assert.calledWith(res.send, [
        { title: "note1", content: "Note content 1" },
        { title: "note2", content: "Note content 2" },
      ]);

      // Restore the stubbed function to its original implementation
      notesService.searchNotes.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await notesController.getNotes(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(
        next,
        sinon.match.instanceOf(InternalServerError)
      );
    });
  });

  describe("getNote", () => {
    it("should return a note on successful getNote", async () => {
      const req = {
        authenticatedUserId: "userId",
        validated: true,
        params: { id: "noteId" },
      };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the getNote function from notesService to return a mock note
      sinon
        .stub(notesService, "getNote")
        .resolves({ title: "Note Title", content: "Note Content" });

      await notesController.getNote(req, res, next);

      // Verify that res.json is called with the expected note
      sinon.assert.calledWith(res.json, {
        title: "Note Title",
        content: "Note Content",
      });

      // Restore the stubbed function to its original implementation
      notesService.getNote.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await notesController.getNote(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(
        next,
        sinon.match.instanceOf(InternalServerError)
      );
    });
  });

  describe("createNote", () => {
    it("should create a new note and return it on successful createNote", async () => {
      const req = {
        authenticatedUserId: "userId",
        validated: true,
        body: { title: "New Note", content: "Note Content" },
      };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      // Stub the createNote function from notesService to return a mock created note
      sinon
        .stub(notesService, "createNote")
        .resolves({ title: "New Note", content: "Note Content" });

      await notesController.createNote(req, res, next);

      // Verify that res.status and res.json are called with the expected created note
      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(res.json, {
        title: "New Note",
        content: "Note Content",
      });

      // Restore the stubbed function to its original implementation
      notesService.createNote.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await notesController.createNote(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(
        next,
        sinon.match.instanceOf(InternalServerError)
      );
    });
  });

  describe("updateNote", () => {
    it("should update the note and return it on successful updateNote", async () => {
      const req = {
        authenticatedUserId: "userId",
        validated: true,
        params: { id: "noteId" },
        body: { title: "Updated Note", content: "Updated Note Content" },
      };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the updateNote function from notesService to return a mock updated note
      sinon
        .stub(notesService, "updateNote")
        .resolves({ title: "Updated Note", content: "Updated Note Content" });

      await notesController.updateNote(req, res, next);

      // Verify that res.json is called with the expected updated note
      sinon.assert.calledWith(res.json, {
        title: "Updated Note",
        content: "Updated Note Content",
      });

      // Restore the stubbed function to its original implementation
      notesService.updateNote.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await notesController.updateNote(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(
        next,
        sinon.match.instanceOf(InternalServerError)
      );
    });
  });

  describe("deleteNote", () => {
    it("should delete the note and return a response on successful deleteNote", async () => {
      const req = {
        authenticatedUserId: "userId",
        validated: true,
        params: { id: "noteId" },
      };
      const res = { json: sinon.stub() };
      const next = sinon.stub();

      // Stub the deleteNote function from notesService to return a mock response
      sinon
        .stub(notesService, "deleteNote")
        .resolves({ message: "Note deleted successfully" });

      await notesController.deleteNote(req, res, next);

      // Verify that res.json is called with the expected response
      sinon.assert.calledWith(res.json, {
        message: "Note deleted successfully",
      });

      // Restore the stubbed function to its original implementation
      notesService.deleteNote.restore();
    });

    it("should call next with InternalServerError if request is not validated", async () => {
      const req = { authenticatedUserId: "userId", validated: false };
      const res = {};
      const next = sinon.stub();

      await notesController.deleteNote(req, res, next);

      // Verify that next is called with an InternalServerError
      sinon.assert.calledWithMatch(
        next,
        sinon.match.instanceOf(InternalServerError)
      );
    });
  });
});
