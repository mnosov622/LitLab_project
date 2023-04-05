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

module.exports = router;
