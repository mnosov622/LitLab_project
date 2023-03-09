const express = require("express");
const client = require("../mongodb");
const router = express.Router();

router.post("/course/:id", async (req, res) => {
  const { id } = req.params;
  const { name, star, review } = req.body;

  const db = client.db("courses");
  const collection = db.collection("courses");

  try {
    await client.connect();

    const result = await collection.updateOne(
      { id: Number(id) },
      {
        $push: {
          courseReview: { name, star, review },
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(201).send("Review added successfully");
    } else {
      res.status(404).send("Course not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding review");
  }
});

router.post("/creator/:id", async (req, res) => {
  const { id } = req.params;
  const { name, star, review } = req.body;
  const db = client.db("courses");
  const collection = db.collection("courses");

  try {
    await client.connect();

    const result = await collection.updateOne(
      { id: Number(id) },
      {
        $push: {
          creatorReview: { name, star, review },
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(201).send("Review added successfully");
    } else {
      res.status(404).send("Course not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding review");
  }
});

module.exports = router;
