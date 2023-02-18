const express = require("express");
const client = require("../../mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("query", req.query.q);
  const db = client.db("courses");

  const searchQuery = req.query.q;
  const regex = new RegExp(searchQuery, "ig");
  const results = await db
    .collection("courses")
    .find({ name: { $regex: regex } })
    .toArray();
  res.json(results);
});

module.exports = router;
