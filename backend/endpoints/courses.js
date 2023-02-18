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

module.exports = router;
