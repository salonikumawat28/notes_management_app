const mongoose = require("mongoose");
const config = require("../config");
// const AutoIncrementFactory = require("mongoose-sequence");

// const AutoIncrement = AutoIncrementFactory(mongoose);

// Note: Setting _id to false so that mongoose doesn't auto create the _id.
const notesSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
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
notesSchema.set('maxTimeMS', config.dbTimeoutInMs);

notesSchema.pre('save', function(next) {
  console.log("***** baba");
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

// { _id: false }

// Note: Setting mongoose-sequence to auto increment the _id.
// notesSchema.plugin(AutoIncrement, { id: "note_id_counter", inc_field: "_id" });

// Index in ascending order.
// notesSchema.index({ _id: 1 });

const notesModel = mongoose.model("Notes", notesSchema);

module.exports = notesModel;
