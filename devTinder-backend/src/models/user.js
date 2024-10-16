const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      validate(value) {
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
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid:" + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
      validate(value) {
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

userSchema.methods.getJWT = async function () {
  const { _id } = this._id;
  const token = await jwt.sign({ _id: _id }, "Tinder@Dev$321", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passordInputByUser) {
  const passwordHash = this.password;
  const isPasswordvalid = await bcrypt.compare(
    passordInputByUser,
    passwordHash
  );
  return isPasswordvalid;
};

const User = model("User", userSchema);
module.exports = User;
