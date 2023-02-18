const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net";

router.get("/", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("courses");
      db.collection("courses")
        .find({})
        .toArray((err, courses) => {
          if (err) throw err;
          res.json(courses);
          client.close();
        });
    }
  );
});

router.get("/:id", (req, res) => {
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

router.delete("/:courseName", (req, res) => {
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

//delete the course - admin endpoint
//TODO: Protect the route, so that only admin can do that
router.delete("/:name", (req, res) => {
  console.log(req.params.id);
  const courseName = req.params.name;
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    const db = client.db("courses");
    const collection = db.collection("courses");
    collection.find().toArray((err, courses) => {
      if (err) throw err;
      const courseToDelete = courses.find(
        (course) => course.name === courseName
      );
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
});

module.exports = router;
