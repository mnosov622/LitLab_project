const express = require("express");
const { User } = require("../models/users");
const client = require("../mongodb");
const router = express.Router();

router.post("/course/:id", async (req, res) => {
  const { id } = req.params;
  const { name, star, review, reviewerId } = req.body;

  const db = client.db("courses");
  const collection = db.collection("courses");

  try {
    await client.connect();

    const result = await collection.updateOne(
      { id: Number(id) },
      {
        $push: {
          courseReview: { name, star, review, reviewerId },
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
  const { name, star, review, reviewerId } = req.body;
  const db = client.db("courses");
  const collection = db.collection("courses");

  try {
    await client.connect();

    const result = await collection.updateOne(
      { id: Number(id) },
      {
        $push: {
          creatorReview: { name, star, review, reviewerId },
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

router.post("/creator", async (req, res) => {
  const db = client.db("users");

  const { name, email, course, reviewText, star, date } = req.body;
  try {
    await client.connect();
    console.log("data received", name, email, course);

    // Find the user by email
    const user = await db.collection("users").findOne({ email: email });

    console.log("user is ", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user doesn't have a reviews array, create it
    if (!user.reviews) {
      user.reviews = [];
    }

    // Create the review object
    const review = {
      name: name,
      course: course,
      star: String(star),
      date: date,
      review: reviewText,
    };

    // Add the new review to the array
    user.reviews.push(review);

    // Update the user in the database
    const result = await db
      .collection("users")
      .updateOne({ email: email }, { $set: { reviews: user.reviews } });

    if (result.modifiedCount !== 1) {
      throw new Error("Failed to update user's reviews");
    }

    res.status(201).json({ message: "Review added successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
