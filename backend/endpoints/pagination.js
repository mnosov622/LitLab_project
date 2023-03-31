const express = require("express");
const client = require("../mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const db = client.db("courses");
  const collection = db.collection("courses");

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await collection.countDocuments())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await collection
      .find()
      .skip(startIndex)
      .limit(limit)
      .toArray();
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
