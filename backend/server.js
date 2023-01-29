const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//MongoDB
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net";

//Using fake data for now
const users = [
  {
    id: 1,
    email: "learner@gmail.com",
    password: "demo123",
    isLearner: true,
  },
  {
    id: 2,
    email: "creator@gmail.com",
    password: "demo123",
    isCreator: true,
  },
];

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("users");
  dbo
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("ALL USERS", result);
      db.close();
    });
});
const secret = "superSecret";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//TODO: implement creating account functionality
app.post("/register", (req, res) => {});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  console.log("user", user);
  if (!user) {
    res.status(404).send("You don't have an account");
  } else if (user.password === password && user.email === email) {
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    res.status(200).send({ token, user });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.listen(8000, () => console.log("Server is up on port 8000"));
