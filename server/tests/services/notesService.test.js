const { expect } = require("chai");
const sinon = require("sinon");
const { NotFoundError } = require("../../errors/errors");
const notesService = require("../../services/notesService");
const notesModel = require("../../models/notesModel");

describe("Notes Service", () => {
  // Restore stubs after tests are complete
  afterEach(() => {
    sinon.restore();
  });

  describe("searchNotes", () => {
    it("should return search results", async () => {
      const searchQuery = "example";
      const authorId = "userId";

      const findStub = sinon.stub(notesModel, "find");
      findStub.returns({
        sort: sinon.stub().returnsThis(),
        select: sinon.stub().returnsThis(),
        exec: sinon.stub().resolves([]),
      });

      const result = await notesService.searchNotes(searchQuery, authorId);

      sinon.assert.calledWith(
        findStub,
        { $text: { $search: searchQuery }, author: authorId },
        { score: { $meta: "textScore" } }
      );

      expect(result).to.be.an("array");
    });

    it("should handle empty search results", async () => {
      const searchQuery = "nonExistent";
      const authorId = "userId";

      sinon.stub(notesModel, "find").returns({
        sort: sinon.stub().returnsThis(),
        select: sinon.stub().returnsThis(),
        exec: sinon.stub().resolves([]),
      });

      const result = await notesService.searchNotes(searchQuery, authorId);

      expect(result).to.be.an("array").that.is.empty;
    });
  });

  describe("getNotes", () => {
    it("should return user's notes", async () => {
      const authorId = "userId";

      const findStub = sinon.stub(notesModel, "find");
      findStub.returns({
        select: sinon.stub().resolves([]),
      });

      const result = await notesService.getNotes(authorId);

      sinon.assert.calledWith(findStub, { author: authorId });

      expect(result).to.be.an("array");
    });

    it("should handle empty user's notes", async () => {
      const authorId = "nonExistentUserId";

      sinon.stub(notesModel, "find").returns({
        select: sinon.stub().resolves([]),
      });

      const result = await notesService.getNotes(authorId);

      expect(result).to.be.an("array").that.is.empty;
    });
  });

  describe("getNote", () => {
    it("should return a note", async () => {
      const noteId = "existingNoteId";
      const authorId = "userId";

      const findOneStub = sinon.stub(notesModel, "findOne");
      findOneStub.returns({
        select: sinon.stub().returnsThis(),
      });

      const result = await notesService.getNote(noteId, authorId);

      sinon.assert.calledWith(findOneStub, { _id: noteId, author: authorId });

      expect(result).to.be.an("object");
    });

    it("should throw NotFoundError when note is not found", async () => {
      const noteId = "nonExistentNoteId";
      const authorId = "userId";

      sinon.stub(notesModel, "findOne").returns({
        select: sinon.stub().resolves(null),
      });

      await expect(notesService.getNote(noteId, authorId)).to.be.rejectedWith(
        NotFoundError,
        "Note not found."
      );
    });
  });

  describe("createNote", () => {
    it("should create a note", async () => {
      const noteToCreate = {
        title: "Test Note",
        content: "This is a test note.",
      };
      const authorId = "userId";
      const createdAt = new Date();
      const updatedAt = new Date();

      const createStub = sinon.stub(notesModel, "create");
      createStub.resolves({
        _id: "newNoteId",
        title: noteToCreate.title,
        content: noteToCreate.content,
        _createdAt: createdAt,
        _updatedAt: updatedAt,
      });

      const result = await notesService.createNote(noteToCreate, authorId);

      sinon.assert.calledWith(createStub, {
        ...noteToCreate,
        author: authorId,
      });

      expect(result).to.deep.equal({
        _id: "newNoteId",
        title: noteToCreate.title,
        content: noteToCreate.content,
        _createdAt: createdAt,
        _updatedAt: updatedAt,
      });
    });

    it("should handle validation error", async () => {
      const noteToCreate = {
        // Missing required field title
        content: "This is a test note.",
      };
      const authorId = "userId";

      // Stubbing notesModel.create to simulate a validation error
      sinon.stub(notesModel, "create").throws({
        name: "ValidationError",
        message: "Note validation failed: title: Path `title` is required.",
      });

      // Use chai's expect to assert the error
      await expect(
        notesService.createNote(noteToCreate, authorId)
      ).to.be.rejectedWith(
        // Assuming the exact error message from your validation logic
        "Note validation failed: title: Path `title` is required."
      );
    });
  });

  describe("updateNote", () => {
    it("should update a note", async () => {
      const noteDataToUpdate = {
        title: "Updated Test Note",
        content: "This is an updated test note.",
      };
      const noteId = "existingNoteId";
      const authorId = "userId";
      const createdAt = new Date();
      const updatedAt = new Date();

      const findOneAndUpdateStub = sinon.stub(notesModel, "findOneAndUpdate");
      findOneAndUpdateStub.returns({
        select: sinon.stub().resolves({
          _id: noteId,
          title: noteDataToUpdate.title,
          content: noteDataToUpdate.content,
          _createdAt: createdAt,
          _updatedAt: updatedAt,
        }),
      });

      const result = await notesService.updateNote(
        noteDataToUpdate,
        noteId,
        authorId
      );

      sinon.assert.calledWith(
        findOneAndUpdateStub,
        { _id: noteId, author: authorId },
        { $set: noteDataToUpdate },
        { new: true }
      );

      expect(result).to.deep.equal({
        _id: noteId,
        title: noteDataToUpdate.title,
        content: noteDataToUpdate.content,
        _createdAt: createdAt,
        _updatedAt: updatedAt,
      });
    });

    it("should handle validation error", async () => {
      const noteDataToUpdate = {
        // Missing required field title
        content: "This is an updated test note.",
      };
      const noteId = "existingNoteId";
      const authorId = "userId";

      // Stubbing notesModel.findOneAndUpdate to simulate a validation error
      sinon.stub(notesModel, "findOneAndUpdate").throws({
        name: "ValidationError",
        message: "Note validation failed: title: Path `title` is required.",
      });

      // Use chai's expect to assert the error
      await expect(
        notesService.updateNote(noteDataToUpdate, noteId, authorId)
      ).to.be.rejectedWith(
        // Assuming the exact error message from your validation logic
        "Note validation failed: title: Path `title` is required."
      );
    });
  });

  describe("deleteNote", () => {
    it("should delete a note", async () => {
      const noteId = "existingNoteId";
      const authorId = "userId";

      const deleteOneStub = sinon.stub(notesModel, "deleteOne");
      deleteOneStub.resolves({ deletedCount: 1 });

      const result = await notesService.deleteNote(noteId, authorId);

      sinon.assert.calledWith(deleteOneStub, { _id: noteId, author: authorId });

      expect(result).to.deep.equal({ message: "Note deleted successfully" });
    });

    it("should handle note not found", async () => {
      const nonExistentNoteId = "nonExistentNoteId";
      const authorId = "userId";

      // Stubbing notesModel.deleteOne to simulate a note not found
      sinon.stub(notesModel, "deleteOne").resolves({ deletedCount: 0 });

      // Use chai's expect to assert the error
      await expect(
        notesService.deleteNote(nonExistentNoteId, authorId)
      ).to.be.rejectedWith(NotFoundError, "Unable to delete note.");
    });
  });
});
