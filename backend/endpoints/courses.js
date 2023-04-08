const express = require("express");
const client = require("../mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await client.connect(); // Ensure that the client is connected before proceeding
    const db = client.db("courses");
    const courses = await db.collection("courses").find({}).toArray();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("courses");
    const course = await db
      .collection("courses")
      .findOne({ id: Number(req.params.id) });
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found", id: req.params.id });
    }

    res.status(200).send({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error getting course from the database",
      error: err,
    });
  }
});

router.get("/:name", async (req, res) => {
  console.log("name", req.params.name);
  try {
    await client.connect();
    const db = client.db("courses");
    const course = await db
      .collection("courses")
      .findOne({ instructor: req.params.name });
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found", name: req.params.name });
    }

    res.status(200).send({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error getting course from the database",
      error: err,
    });
  }
});

//when user pays the course, increase amount of enrollments by 1
router.put("/:id/increase-enrollments", async (req, res) => {
  try {
    const courseId = Number(req.params.id);
    const db = client.db("courses");

    // Find the course in the courses collection by ID
    const course = await db.collection("courses").findOne({ id: courseId });

    if (!course) {
      // Send a 404 response if the course was not found
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }

    // Increase the enrollments count for the course by 1
    await db
      .collection("courses")
      .updateOne({ id: courseId }, { $inc: { enrollments: 1 } });

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Enrollments increased for course" });
  } catch (error) {
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Failed to increase enrollments for course",
      error,
    });
  } finally {
    client.close();
  }
});

router.post("/", async (req, res) => {
  try {
    await client.connect();

    const {
      email,
      name,
      price,
      shortDescription,
      longDescription,
      video,
      instructorImageURL,
      courseImageURL,
      instructor,
      courseContent,
      pointsToLearn,
      pointsSummary,
      test,
      enrollments,
      instructorId,
      instructorBio,
    } = req.body;

    console.log("points to learn recieved", pointsToLearn);

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
      courseImageURL,
      email,
      name,
      price,
      shortDescription,
      longDescription,
      instructor,
      courseContent,
      pointsToLearn,
      pointsSummary,
      test,
      enrollments,
      instructorId: 16,
      instructorImageURL,
      instructorBio,
    };

    const result = await client
      .db("courses")
      .collection("courses")
      .insertOne(course);

    res
      .status(200)
      .json({ message: "Course added successfully", course: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:courseName", async (req, res) => {
  try {
    const db = client.db("courses");
    const result = await db
      .collection("courses")
      .deleteOne({ name: req.params.courseName });
    client.close();
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.status(200).send({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting course", err });
  }
});

//delete the course - admin endpoint
//TODO: Protect the route, so that only admin can do that
router.delete("/:name", (req, res) => {
  console.log(req.params.id);
  const courseName = req.params.name;

  const db = client.db("courses");
  const collection = db.collection("courses");

  collection.find().toArray((err, courses) => {
    if (err) throw err;
    const courseToDelete = courses.find((course) => course.name === courseName);
    if (!courseToDelete) {
      res.status(404).send(`Course ${courseName} not found`);
    } else {
      collection.deleteOne({ name: courseName }, (err, result) => {
        if (err) throw err;
        res.status(204).send();
        client.close();
      });
    }
  });
});

//edit course - admin endpoint
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = req.body.updatedCourse;
    const db = client.db("courses");
    const collection = db.collection("courses");

    const filter = { id: Number(id) };
    const update = {
      $set: { name: updatedCourse.name, price: updatedCourse.price },
    };
    const options = { returnOriginal: false };
    const course = await collection.findOneAndUpdate(filter, update, options);

    if (!course.value) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course.value);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/creator", async (req, res) => {
  const { courseName, courseImage, userName, email, userEmail } = req.body;
  console.log(
    "data recived",
    courseName,
    courseImage,
    userName,
    email,
    userEmail
  );

  const db = client.db("users");
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  console.log("user is", user);

  let updatedUser;
  if (user.usersEnrolled) {
    updatedUser = await db.collection("users").findOneAndUpdate(
      { email },
      {
        $push: {
          usersEnrolled: { courseName, courseImage, userName, userEmail },
        },
      },
      { returnOriginal: false }
    );
  } else {
    updatedUser = await db.collection("users").findOneAndUpdate(
      { email },
      {
        $set: {
          usersEnrolled: [{ courseName, courseImage, userName, userEmail }],
        },
      },
      { returnOriginal: false }
    );
  }

  res.json(updatedUser.value);
});

router.put("/creator/enrollments", async (req, res) => {
  const { email } = req.body;
  client.connect();
  const db = client.db("users");
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  console.log("user is", user);

  const updatedUser = await db
    .collection("users")
    .findOneAndUpdate(
      { email },
      { $inc: { totalEnrollments: 1 } },
      { returnOriginal: false }
    );

  res.json(updatedUser.value);
});

const nodemailer = require("nodemailer");

router.post("/feedback", (req, res) => {
  const { userEmail, creatorEmail, message, name } = req.body;
  console.log("data recived", userEmail, creatorEmail, message, name);
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "litlab200@gmail.com",
      pass: "fbwvydwfqefelrmb",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailData = {
    from: "mnosov622@gmail.com",
    to: creatorEmail,
    subject: "Feedback from learner",
    html: `
    <style>
    .contact-message {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      margin: 20px;
      max-width: 500px;
    }

    .contact-message h2 {
      font-size: 24px;
      margin-top: 0;
    }

    .contact-message p {
      font-size: 18px;
      margin: 10px 0;
    }

    .contact-message strong {
      font-weight: bold;
    }
    </style>
    <div class="contact-message">
    <h2>Feedback</h2>
    <p><strong>From:</strong> ${name} (${userEmail})</p>
    <p><strong>Message:</strong> ${message}</p>
  </div>`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(505).send({ error: "Server error" });
      return console.log("errpr", error);
    }
    res.status(200).send({
      message: "Mail send",
      message_id: info.messageId,
      success: true,
    });
  });
});

module.exports = router;
