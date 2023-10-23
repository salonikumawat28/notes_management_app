const { NotFoundError } = require("../errors/errors");
const notesModel = require("../models/notesModel");

async function searchNotes(searchQuery, authorId) {
  return await notesModel
    .find(
      { $text: { $search: searchQuery }, author: authorId },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .select("_id title content _createdAt _updatedAt")
    .select({ score: 0 });
}

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
  const createdNote = await notesModel.create({
    ...noteToCreate,
    author: authorId,
  });
  const { _id, title, content, _createdAt, _updatedAt } = createdNote;
  return { _id, title, content, _createdAt, _updatedAt };
}

async function updateNote(noteDataToUpdate, noteId, authorId) {
  return await notesModel
    .findOneAndUpdate(
      { _id: noteId, author: authorId },
      { $set: noteDataToUpdate },
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
  searchNotes,
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
module.exports = notesService;
