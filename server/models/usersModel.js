const mongoose = require("mongoose");
// const AutoIncrementFactory = require("mongoose-sequence");
// const AutoIncrement = AutoIncrementFactory(mongoose);
const _ = require('underscore');
const config = require("../config");

// Note: Setting _id to false so that mongoose doesn't auto create the _id.
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2, // Minimum length of 2 characters
      maxlength: 50, // Maximum length of 50 characters
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      maxlength: 320, // Maximum length for an email address
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    _createdAt: Date,
    _updatedAt: Date,
  }
);
usersSchema.set('maxTimeMS', config.dbTimeoutInMs);

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
// ,{ _id: false }

// Auto increment.
// Note: Setting mongoose-sequence to auto increment the _id.
// userSchema.plugin(AutoIncrement, { id: "user_id_counter", inc_field: "_id" });

// Index in ascending order.
// userSchema.index({ _id: 1 });

// Custom methods for User model
// TODO: User password encryption
// userSchema.statics.login = async function ({email, password}) {
//   console.log("userModel.login started");
//   const user = await this.findOne({email: email});
//   console.log("userModel.login found user: ", user);
//   if(_.isEmpty(user)) return null;
//   console.log("user is not null ");
//   if(user.password === password) {
//     console.log("user password matched ");
//     return user;
//   }
//   console.log("user password didnt match ");
//   return null;
// };

const usersModel = mongoose.model("User", usersSchema);

module.exports = usersModel;
