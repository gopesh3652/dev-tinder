const express = require("express");
const connectDB = require("./configs/database");
const User = require("./models/user");

const app = express();
const PORT = 3000;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Martin",
    lastName: "Joseph",
    emailId: "joseph@hotmail.com",
    password: "joseph@321",
  });

  try {
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connection to database established successfully....");
    app.listen(PORT, () => {
      console.log(
        `server is successfully listening on port http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("database connection unsuccessful.");
  });
