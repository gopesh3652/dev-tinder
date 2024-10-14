const { Schema, model } = require("mongoose");
const validator = require("validator");

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
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid emailn address:" + value);
        }
      },
    },
    password: {
      type: String,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("strong password required:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      lowercase: true,
      validator(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid:" + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
      validator(value) {
        if (!validator.isURL(value)) {
          throw new Error("valid photo url required:" + value);
        }
      },
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
