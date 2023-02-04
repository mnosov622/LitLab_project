const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const gridfs = require("gridfs-stream");
const multer = require("multer");

//MongoDB
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("mongodb");

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

app.post("/register-with-google", async (req, res) => {
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
            MongoClient.connect(
              url,
              { useUnifiedTopology: true },
              function (err, db) {
                if (err) throw err;
                const user = {
                  name: req.body.name,
                  email: req.body.email,
                  token: req.body.token,
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
          name: user.name,
          isLearner: user?.isLearner,
          isCreator: user?.isCreator,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "2h" });

        res.status(200).send({ user, token });

        db.close();
      });
  });
});

app.post("/googleLogin", (req, res) => {
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

        if (user.email !== req.body.email) {
          return res.status(401).json({ message: "Incorrect credentials" });
        }

        const payload = {
          id: user._id,
          email: user.email,
          name: user.name,
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

app.get("/courses/:id", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("courses");
    dbo
      .collection("courses")
      .findOne({ id: Number(req.params.id) }, async function (err, course) {
        if (err) throw err;
        if (!course) {
          return res
            .status(404)
            .json({ message: "Course not found", id: req.params.id });
        }

        res.status(200).send({ course });
        db.close();
      });
  });
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

// app.get("/creator-courses/:id", (req, res) => {
//   MongoClient.connect(
//     url,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (err, client) {
//       if (err) throw err;
//       const db = client.db("users");
//       db.collection("creator-courses")
//         .find({})
//         .toArray((err, users) => {
//           if (err) throw err;
//           res.json(users);
//           client.close();
//         });
//     }
//   );
// });

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

//not sure how it works yet, but it's magic, so don't touch it pleaseee
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db("users");
  const bucket = new mongodb.GridFSBucket(db);
  const storage = new multer.memoryStorage();
  const upload = multer({ storage });

  app.post("/upload", upload.single("video"), (req, res) => {
    const video = req.file;
    const uploadStream = bucket.openUploadStream(video.originalname);

    uploadStream.write(video.buffer);
    uploadStream.end();

    db.collection("users").updateOne(
      { email: req.body.email },
      {
        $push: {
          courses: {
            id: { $inc: 1 },
            video: video.originalname,
            courseName: req.body.courseName,
            price: req.body.price,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
          },
        },
      },
      (err) => {
        if (err) throw err;
        res.status(200).json({
          message: "Video uploaded successfully",
          filename: video.originalname,
        });
      }
    );
  });

  app.get("/video/:filename", (req, res) => {
    bucket.find().toArray((err, files) => {
      console.log(files.map((file) => file.filename));
    });

    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on("error", () => {
      return res.status(404).json({ message: "Video not found" });
    });

    res.set("Content-Type", "video/mp4");

    downloadStream.pipe(res);
  });
});

app.listen(8000, () => console.log("Server is up on port 8000"));
