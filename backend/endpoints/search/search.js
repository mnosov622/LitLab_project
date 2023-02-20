const express = require("express");
const client = require("../../mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const db = client.db("courses");
  const searchQuery = req.query.q;
  const regex = new RegExp(searchQuery, "i");
  const results = await db
    .collection("courses")
    .find({ name: { $regex: regex } })
    .toArray();
  res.json(results);
});

module.exports = router;
