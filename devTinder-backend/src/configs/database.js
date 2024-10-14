const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://gopesh:Pj5fWOsqB61A35Bm@practice.k3oza.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(dbURI);
};

module.exports = connectDB;
