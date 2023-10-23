const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 255,
    },
    content: {
      type: String,
      maxLength: 2048
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    _createdAt: Date,
    _updatedAt: Date,
  }
);

// Create a text index on title and content fields
notesSchema.index({ title: 'text', content: 'text' });

// Auto record created and updated timestamps
notesSchema.pre('save', function(next) {
  const currentDate = new Date();

  // Update the _updatedAt field
  this._updatedAt = currentDate;

  // If the document is new, set the _createdAt field
  if (!this._createdAt) {
    this._createdAt = currentDate;
  }

  next();
});

notesSchema.pre('findOneAndUpdate', function(next) {
  this.set({ _updatedAt: new Date() });
  next();
});

const notesModel = mongoose.model("Notes", notesSchema);
module.exports = notesModel;
