const express = require("express");
const client = require("../mongodb");
const router = express.Router();

router.put("/:id", (req, res) => {
  const userId = req.params.id;

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

module.exports = router;
