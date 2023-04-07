const express = require("express");
const client = require("../mongodb");
const router = express.Router();

router.get("/name", async (req, res) => {
  const { name } = req.query;
  console.log("name", name);
  // using req.query to get the name parameter from the URL query string
  const db = client.db("courses");
  const user = await db.collection("courses").findOne({ instructor: name });
  console.log("user is", user);
  if (!user) {
    return res.status(404).send("User not found");
  }

  console.log("user is", user);

  res.json(user);
});

router.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  console.log("name", name);
  // using req.params to get the name parameter from the URL path
  const db = client.db("courses");
  const users = await db
    .collection("courses")
    .find({ instructor: name })
    .toArray();
  console.log("users are", users);
  if (users.length === 0) {
    return res.status(404).send("Users not found");
  }

  console.log("users are", users);

  res.json(users);
});

module.exports = router;
