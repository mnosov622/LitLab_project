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
const { GridFSBucket } = require("mongodb");
const mongodb = require("mongodb");
const usersRouter = require("./endpoints/users");
const coursesRouter = require("./endpoints/courses");
const registerCreator = require("./endpoints/signup/creatorSignup");
const registerLearner = require("./endpoints/signup/learnerSignup");
const googleSignup = require("./endpoints/signup/googleSignup");
const googleLogin = require("./endpoints/login/googleLogin");
const login = require("./endpoints/login/login");
const search = require("./endpoints/search/search");
const contactUs = require("./endpoints/contact-us");
const forgotPassword = require("./endpoints/forgotPassword");
const resetPassword = require("./endpoints/resetPassword");
const buyCourse = require("./endpoints/buy-course");
const creatorInfo = require("./endpoints/creator");
const review = require("./endpoints/review");
const pagination = require("./endpoints/pagination");
const creatorProfile = require("./endpoints/creatorProfile");

const dotenv = require("dotenv");
const client = require("./mongodb");
const { User } = require("./models/users");
const { Creator } = require("./models/creator");
dotenv.config();
const secret = "secret";

const url = "mongodb+srv://litlab200:litlab@cluster0.fbncwuq.mongodb.net";

//update this line to handle cors issues
app.use(
  cors({
    origin: "https://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes for courses
app.use("/courses", coursesRouter);

//routes for users
app.use("/users", usersRouter);

//routes for registering user
app.use("/registerLearner", registerLearner);
app.use("/registerCreator", registerCreator);
app.use("/register-with-google", googleSignup);

//login user
app.use("/googleLogin", googleLogin);
app.use("/login", login);

//search for courses route
app.use("/search", search);

//contact us
app.use("/contact-us", contactUs);

//forgot password
app.use("/forgot-password", forgotPassword);

//reset password
app.use("/reset-password", resetPassword);

//buy course
app.use("/buy-course", buyCourse);

//update creator info
app.use("/creator", creatorInfo);

//leave a review
app.use("/review", review);

//pagination
app.use("/pagination", pagination);

//Profile
app.use("/creatorprofile", creatorProfile);

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;

  const db = client.db("users");
  const bucket = new mongodb.GridFSBucket(db);
  const storage = new multer.memoryStorage();
  const upload = multer({ storage });

  app.post("/upload", upload.array("files"), (req, res) => {
    console.log("courseContent", JSON.parse(req.body.courseContent));
    console.log("pointsToLearn", JSON.parse(req.body.pointsToLearn));
    // console.log("test", JSON.parse(req.body.questions));

    const videoFile = req.files.find((file) => file.mimetype.startsWith("video/"));
    const imageFile = req.files.find((file) => file.mimetype.startsWith("image/"));

    // Upload the video file
    const videoUploadStream = bucket.openUploadStream(videoFile.originalname);
    videoUploadStream.write(videoFile.buffer);
    videoUploadStream.end();

    // Upload the image file
    const imageUploadStream = bucket.openUploadStream(imageFile.originalname);
    imageUploadStream.write(imageFile.buffer);
    imageUploadStream.end();

    console.log("video file", videoFile, videoFile.originalname);
    console.log("iamge file", imageFile, imageFile.originalname);

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
                courseImageURL: imageFile.originalname,
                pointsSummary: req.body.pointsSummary,
                pointsToLearn: JSON.parse(req.body.pointsToLearn),
                courseContent: JSON.parse(req.body.courseContent),
                // test: JSON.parse(req.body.questions),
                enrollments: 0,
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
              test: req.body.test,
            });
          }
        );
      });
  });

  app.get("/videos/:filename", (req, res) => {
    bucket.find({ filename: req.params.filename }).toArray((err, files) => {
      if (err) {
        return res.status(404).json({ message: "Video not found" });
      }
      // continue with the rest of the code
    });

    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on("error", () => {
      return res.status(404).json({ message: "Video not found" });
    });

    res.set("Content-Type", "video/mp4");

    downloadStream.pipe(res);
  });

  app.get("/images/:filename", (req, res) => {
    const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

    downloadStream.on("error", () => {
      return res.status(404).json({ message: "Image not found" });
    });

    res.set("Content-Type", "image/jpeg");

    downloadStream.pipe(res);
  });
});

//update course for the user
app.put("/creator-courses/:id/courses/:courseId", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db("users");
    dbo.collection("users").findOne({ _id: ObjectId(req.params.id) }, function (err, user) {
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

//TODO: Update course for all courses section
app.put("/courses/:name", (req, res) => {
  const db = client.db("courses");
  db.collection("courses").findOne({ name: req.params.name }, function (err, course) {
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      db.collection("courses").updateOne(
        { name: req.params.name },
        {
          $set: {
            name: req.body.updatedCourse.name,
            price: req.body.updatedCourse.price,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
          },
        },
        function (err, result) {
          if (err) throw err;
          res.send({
            message: "course data updated successfully",
            result: result,
          });
        }
      );
    }
  });
});

app.get("/user-course/:userId", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db("users");
    db.collection("users").findOne({ _id: new ObjectId(req.params.userId) }, (err, user) => {
      if (err) throw err;
      res.json(user);
      client.close();
    });
  });
});

app.delete("/users/:userEmail/courses/:courseId", (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return res.status(500).send({ message: "Error connecting to database: " + err });
    }

    const db = client.db("users");

    db.collection("users").updateOne(
      { email: req.params.userEmail },
      { $pull: { courses: { id: Number(req.params.courseId) } } },
      (err, result) => {
        client.close();
        if (err) {
          return res.status(500).send({ message: "Error deleting course: " + err });
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

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is up and running on port " + process.env.PORT || 8000);
});
