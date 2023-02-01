const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

//MongoDB
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { User } = require("./models/users");
// const { Course } = require("./models/courses");

const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net";
const secret = "superSecret";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//TODO: implement creating account functionality
app.post("/registerLearner", async (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("users");
      db.collection("users")
        .find({})
        .toArray(async (err, users) => {
          if (err) throw err;
          const user = users.find((u) => u.email === req.body.email);
          if (user) {
            console.log("USER ALREADY EXISTS");
            return res.status(409).send("User exists");
          } else {
            console.log("user doesn't exists");
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log("Hashed password", hashedPassword);
            MongoClient.connect(
              url,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                const user = {
                  name: req.body.name,
                  email: req.body.email,
                  password: hashedPassword,
                  isLearner: req?.body?.isLearner,
                };
                var dbo = db.db("users");
                dbo.collection("users").insertOne(user, function (err, user) {
                  if (err) throw err;

                  console.log("user inserted", user);
                  res.status(200).send({ user });
                  db.close();
                });
              }
            );
          }
          client.close();
        });
    }
  );
});

app.post("/registerCreator", async (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("users");
      db.collection("users")
        .find({})
        .toArray(async (err, users) => {
          if (err) throw err;
          const user = users.find((u) => u.email === req.body.email);
          if (user) {
            console.log("USER ALREADY EXISTS");
            return res.status(409).send("User exists");
          } else {
            console.log("user doesn't exists");
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log("Hashed password", hashedPassword);
            MongoClient.connect(
              url,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                const user = {
                  name: req.body.name,
                  email: req.body.email,
                  password: hashedPassword,
                  subject: req.body.subject,
                  education: req.body.education,
                  isCreator: req?.body?.isCreator,
                };
                var dbo = db.db("users");
                dbo.collection("users").insertOne(user, function (err, user) {
                  if (err) throw err;

                  console.log("user inserted", user);
                  res.status(200).send({ user });
                  db.close();
                });
              }
            );
          }
          client.close();
        });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    dbo
      .collection("users")
      .findOne({ email: req.body.email }, async function (err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = user?.password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match || user.email !== req.body.email) {
          return res.status(401).json({ message: "Incorrect credentials" });
        }
        const payload = {
          id: user._id,
          email: user.email,
          isLearner: user?.isLearner,
          isCreator: user?.isCreator,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "2h" });

        res.status(200).send({ user, token });

        db.close();
      });
  });
});

app.get("/courses", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("courses");
      db.collection("courses")
        .find({})
        .toArray((err, users) => {
          if (err) throw err;
          res.json(users);
          client.close();
        });
    }
  );
});

app.get("/users", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("users");
      db.collection("users")
        .find({})
        .toArray((err, users) => {
          if (err) throw err;
          res.json(users);
          client.close();
        });
    }
  );
});

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get("/creator-courses/:id", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("users");
      db.collection("creator-courses")
        .find({})
        .toArray((err, users) => {
          if (err) throw err;
          res.json(users);
          client.close();
        });
    }
  );
});

app.post("/buy-course", (req, res) => {
  const token = req.headers.authorization;
  console.log("TOKEn", token);
  const decoded = jwt.verify(token, secret);
  const userId = decoded.id;

  console.log("user id is", userId);

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    const db = client.db("users");
    const users = db.collection("users");

    users.findOne({ _id: new ObjectId(userId) }, (err, user) => {
      if (err) {
        console.error(err);
        client.close();
        return;
      }

      if (!user.courses) {
        user.courses = [];
      }

      // Add the course to the user's courses list
      user.courses.push({
        id: req.body.courseId,
        courseName: req.body.name,
        instructor: req.body.instructor,
        courseImage: req.body.courseImage,
        price: req.body.price,
      });

      // Update the user document in the database
      users.updateOne(
        { _id: user._id },
        { $set: { courses: user.courses } },
        (err) => {
          if (err) {
            console.error(err);
          }
          client.close();
          res.send({ success: true });
          console.log("added course");
        }
      );
    });
  });
});

app.listen(8000, () => console.log("Server is up on port 8000"));
