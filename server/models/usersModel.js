const mongoose = require("mongoose");

// TODO: constraints are not matching with out validator. Correct it.
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
    },
    _createdAt: Date,
    _updatedAt: Date,
  }
);

// Auto record created and updated timestamps
usersSchema.pre('save', function(next) {
  const currentDate = new Date();

  // Update the _updatedAt field
  this._updatedAt = currentDate;

  // If the document is new, set the _createdAt field
  if (!this._createdAt) {
    this._createdAt = currentDate;
  }

  next();
});

const usersModel = mongoose.model("User", usersSchema);
module.exports = usersModel;
