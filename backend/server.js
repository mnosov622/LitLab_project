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
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    dbo
      .collection("users")
      .findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (
          user.password !== req.body.password ||
          user.email !== req.body.email
        ) {
          return res.status(401).json({ message: "Incorrect credentials" });
        }
        res.status(200).send({ user });
        db.close();
      });
  });
});

app.listen(8000, () => console.log("Server is up on port 8000"));
