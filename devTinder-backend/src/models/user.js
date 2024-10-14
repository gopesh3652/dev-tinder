const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 18,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      lowercase: true,
      // validate: {
      //   validator: function (value) {
      //     if (!["male", "female", "others"].includes(value)) {
      //       throw new error("gender data is not valid");
      //     }
      //   },
      // },
      validator(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new error("gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "Bug can fix me.",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
