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

router.post("/", async (req, res) => {
  try {
    const {
      email,
      name,
      price,
      shortDescription,
      longDescription,
      video,
      courseImageURL,
      instructor,
      courseContent,
      pointsToLearn,
      pointsSummary,
      test,
      enrollments,
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

module.exports = router;
