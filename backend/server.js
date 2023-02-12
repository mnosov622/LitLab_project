const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const gridfs = require("gridfs-stream");
const multer = require("multer");
const nodemailer = require("nodemailer");
//MongoDB
const MongoClient = require("mongodb").MongoClient;
const { GridFSBucket } = require("mongodb");
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
        if (user.isAdmin) {
          if (
            user.password !== req.body.password ||
            user.email !== req.body.email
          ) {
            return res.status(401).json({ message: "Incorrect credentials" });
          }

          const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user?.isAdmin,
          };
          const token = jwt.sign(payload, secret, { expiresIn: "2h" });

          res.status(200).send({ user, token });

          db.close();
          return 0;
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
  const decoded = jwt.verify(token, secret);
  const userId = decoded.id;

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
        isCompleted: false,
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
        }
      );
    });
  });
});

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db("users");
  const bucket = new mongodb.GridFSBucket(db);
  const storage = new multer.memoryStorage();
  const upload = multer({ storage });

  app.post("/upload", upload.array("files"), (req, res) => {
    const videoFile = req.files.find((file) =>
      file.mimetype.startsWith("video/")
    );
    const imageFile = req.files.find((file) =>
      file.mimetype.startsWith("image/")
    );

    // Upload the video file
    const videoUploadStream = bucket.openUploadStream(videoFile.originalname);
    videoUploadStream.write(videoFile.buffer);
    videoUploadStream.end();

    // Upload the image file
    const imageUploadStream = bucket.openUploadStream(imageFile.originalname);
    imageUploadStream.write(imageFile.buffer);
    imageUploadStream.end();

    db.collection("users")
      .aggregate([
        {
          $match: { email: req.body.email },
        },
        {
          $project: {
            maxId: { $max: "$courses.id" },
          },
        },
      ])
      .toArray((err, result) => {
        if (err) throw err;

        const newId = result[0].maxId + 1;
        const newCourse = {};
        db.collection("users").updateOne(
          { email: req.body.email },
          {
            $push: {
              courses: {
                id: newId,
                email: req.body.email,
                video: videoFile.originalname,
                name: req.body.courseName,
                price: req.body.price,
                shortDescription: req.body.shortDescription,
                longDescription: req.body.longDescription,
                courseImage: imageFile.originalname,
              },
            },
          },
          (err) => {
            if (err) throw err;
            res.status(200).json({
              message: "Video uploaded successfully",
              video: videoFile,
              image: imageFile,
              id: newId,
              email: req.body.email,
              video: videoFile.originalname,
              name: req.body.courseName,
              price: req.body.price,
              shortDescription: req.body.shortDescription,
              longDescription: req.body.longDescription,
              courseImage: imageFile.originalname,
            });
          }
        );
      });
  });

  app.get("/videos/:filename", (req, res) => {
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

  app.get("/images/:filename", (req, res) => {
    bucket.find().toArray((err, files) => {
      console.log(files.map((file) => file.filename));
    });

    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on("error", () => {
      return res.status(404).json({ message: "Image not found" });
    });

    res.set("Content-Type", "image/jpeg");

    downloadStream.pipe(res);
  });
});

app.put("/certificate/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const coursesCompleted = req.body.coursesCompleted;
  console.log("name", req.body.courseName);
  // Find the user by ID

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

      if (!user.coursesCompleted) {
        user.coursesCompleted = [];
      }

      // Add the course to the user's courses list
      user.coursesCompleted.push({
        id: req.body.courseId,
        courseName: req.body.name,
        instructor: req.body.instructor,
        courseImage: req.body.courseImage,
        price: req.body.price,
      });

      // Update the user document in the database
      users.updateOne(
        { _id: user._id },
        { $set: { coursesCompleted: user.coursesCompleted } },
        (err) => {
          if (err) {
            console.error(err);
          }
          client.close();
          res.send({ success: true });
        }
      );
    });
  });
});

app.post("/courses", async (req, res) => {
  try {
    const {
      email,
      name,
      price,
      shortDescription,
      longDescription,
      video,
      courseImage,
      instructor,
    } = req.body;

    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();

    const latestCourse = await client
      .db("courses")
      .collection("courses")
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    // Increment the id by 1
    let id = latestCourse.length ? latestCourse[0].id + 1 : 15;

    const course = {
      id,
      video,
      courseImage,
      email,
      name,
      price,
      shortDescription,
      longDescription,
      instructor,
    };

    const result = await client
      .db("courses")
      .collection("courses")
      .insertOne(course);

    client.close();

    res
      .status(201)
      .json({ message: "Course added successfully", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update course

app.put("/creator-courses/:id/courses/:courseId", (req, res) => {
  console.log("updated course received", req.body.updatedCourse);

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("users");
    dbo
      .collection("users")
      .findOne({ _id: ObjectId(req.params.id) }, function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          console.log("user is", user);
          const updatedCourses = user.courses.map((course) => {
            if (Number(course.id) === Number(req.params.courseId)) {
              console.log("course", course);
              return { ...course, ...req.body.updatedCourse };
            }
            return course;
          });
          dbo
            .collection("users")
            .updateOne(
              { _id: ObjectId(req.params.id) },
              { $set: { courses: updatedCourses } },
              function (err, result) {
                if (err) throw err;
                res.send({
                  message: "course data updated successfully",
                  result: result,
                });
                db.close();
              }
            );
        }
      });
  });
});

app.get("/user-course/:userId", (req, res) => {
  console.log("user id", req.params.userId);
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;
      const db = client.db("users");
      db.collection("users").findOne(
        { _id: new ObjectId(req.params.userId) },
        (err, user) => {
          if (err) throw err;
          res.json(user);
          client.close();
        }
      );
    }
  );
});

app.delete("/courses/:courseName", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error connecting to database", err });
    }
    const db = client.db("courses");
    db.collection("courses").deleteOne(
      { name: req.params.courseName },
      (err, result) => {
        client.close();
        if (err) {
          return res
            .status(500)
            .send({ message: "Error deleting course", err });
        }
        res.status(200).send({ message: "Course deleted successfully" });
      }
    );
  });
});

app.delete("/users/:userEmail/courses/:courseId", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error connecting to database: " + err });
    }

    const db = client.db("users");

    db.collection("users").updateOne(
      { email: req.params.userEmail },
      { $pull: { courses: { id: Number(req.params.courseId) } } },
      (err, result) => {
        client.close();
        if (err) {
          return res
            .status(500)
            .send({ message: "Error deleting course: " + err });
        }
        res.send({
          message: `Course with name ${req.params.courseName} was successfully deleted for user with id ${req.params.userEmail}`,
        });
      }
    );
  });
});

//not working yet :(
app.put("/users/:userEmail/courses/:id", (req, res) => {
  User.findOne({ email: req.params.userEmail })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Check if the user has any courses
      if (!user.courses) {
        res.status(404).json({ error: "The user does not have any courses" });
        return;
      }

      // Find the index of the course with the matching id
      const courseIndex = user.courses.findIndex(
        (course) => Number(course.id) === Number(req.params.id)
      );

      // Check if the course with the matching id exists
      if (courseIndex === -1) {
        res.status(404).json({ error: "The course does not exist" });
        return;
      }

      // Update the isCompleted property of the course
      user.courses[courseIndex].isCompleted = true;

      return User.findOneAndUpdate(
        { email: req.params.userEmail },
        { $set: { courses: user.courses } },
        { new: true }
      );
    })
    .then((result) => {
      res.json({ message: "Course updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to update the course" });
    });
});

app.listen(8000, () => console.log("Server is up on port 8000"));
