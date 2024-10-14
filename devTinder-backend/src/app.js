const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/database");
const User = require("./models/user");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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
    res.status(400).send("something went wrong:" + err.message);
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
    res.status(400).send("something went wrong! ", err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("DELETE FAILED:" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(req.params);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "gender", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    // if (data?.skills.length > 10) {
    //   throw new Error("skills cannot be more than 10");
    // }
    const userModified = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("user details updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const email = req.body.email;
  const data = req.body;

  try {
    await User.findOneAndUpdate({ emailId: email }, data);
    res.send("user details updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong:" + err.message);
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
