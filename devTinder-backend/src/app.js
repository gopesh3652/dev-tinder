const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/database");
const User = require("./models/user");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  const user = new User({ firstName, lastName, emailId, password });

  try {
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error saving the user " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.send(400).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("user not found.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong! ", err);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong! ", err);
  }
});

app.patch("/user", async (req, res) => {
  const email = req.body.email;
  const data = req.body;

  try {
    await User.updateOne({ emailId: email }, data);
    res.send("user details updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const userModified = await User.findByIdAndUpdate(userId, data);
    res.send("user details updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
    console.error("database connection unsuccessful.", err);
  });
