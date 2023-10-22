const { NotFoundError } = require("../errors");
const notesModel = require("../models/notesModel");
const utils = require("../utils");

async function getNotes(authorId) {
  return await notesModel
    .find({ author: authorId })
    .select("_id title content _createdAt _updatedAt");
}

async function getNote(noteId, authorId) {
  const note = await notesModel
    .findOne({ _id: noteId, author: authorId })
    .select("_id title content _createdAt _updatedAt");

  if (!note) {
    throw new NotFoundError("Note not found.");
  }
  return note;
}

async function createNote(noteToCreate, authorId) {
  const filteredNoteToCreate = utils.filterObjectFields(noteToCreate, ['title', 'content']);
  const createdNote = await notesModel.create({
    ...filteredNoteToCreate,
    author: authorId,
  });
  const { _id, title, content, _createdAt, _updatedAt } = createdNote;
  return { _id, title, content, _createdAt, _updatedAt };
}

async function updateNote(noteDataToUpdate, noteId, authorId) {
  const filteredNoteDataToUpdate = utils.filterObjectFields(noteDataToUpdate, ['title', 'content', '_createdAt', '_updatedAt']);
  return await notesModel
    .findOneAndUpdate(
      { _id: noteId, author: authorId },
      { $set: filteredNoteDataToUpdate },
      { new: true }
    )
    .select("_id title content _createdAt _updatedAt");
}

async function deleteNote(noteId, authorId) {
  const result = await notesModel.deleteOne({ _id: noteId, author: authorId });
  if (!result.deletedCount) {
    throw new NotFoundError("Unable to delete note.");
  }

  return { message: "Note deleted successfully" };
}

const notesService = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
module.exports = notesService;
