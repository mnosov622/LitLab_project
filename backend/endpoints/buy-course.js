const express = require("express");
const client = require("../mongodb");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const secret = "secret";
const url = "mongodb+srv://litlab200:litlab@cluster0.fbncwuq.mongodb.net";

router.post("/", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const userId = decoded.id;

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error(err);
      return res.send({ success: false, error: err });
    }

    const db = client.db("users");
    const users = db.collection("users");

    users.findOne({ _id: new ObjectId(userId) }, (err, user) => {
      if (err) {
        console.error(err);
        client.close();
        return res.send({ success: false, error: err });
      }

      if (!user.courses) {
        user.courses = [];
      }

      let courses;
      if (Array.isArray(req.body.courses)) {
        courses = req.body.courses;
      } else {
        courses = [req.body.courses];
      }

      // Add the courses to the user's courses list
      courses.forEach((course) => {
        user.courses.push(course);
      });

      // Update the user document in the database
      users.updateOne(
        { _id: user._id },
        { $set: { courses: user.courses } },
        (err) => {
          if (err) {
            console.error(err);
            client.close();
            return res.send({ success: false, error: err });
          }
          client.close();
          res.send({ success: true });
        }
      );
    });
  });
});

module.exports = router;
