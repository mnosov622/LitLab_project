const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const client = require("../../mongodb");
router.post("/", async (req, res) => {
  try {
    const db = client.db("users");
    const users = await db.collection("users").find({}).toArray();
    const user = users.find((u) => u.email === req.body.email);
    if (user) {
      return res.status(409).send("User exists");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isLearner: req?.body?.isLearner,
      };
      const result = await db.collection("users").insertOne(user);
      res.status(200).send("");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
