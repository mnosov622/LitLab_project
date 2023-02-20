const express = require("express");
const router = express.Router();
const client = require("../../mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = "secret";

router.post("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("users");
    db.collection("users").findOne(
      { email: req.body.email },
      async function (err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        if (user.email !== req.body.email) {
          return res.status(401).json({ message: "Incorrect credentials" });
        }
  
        const payload = {
          id: user._id,
          email: user.email,
          name: user.name,
          isLearner: user?.isLearner,
          isCreator: user?.isCreator,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  
        res.status(200).send({ user, token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
});


module.exports = router;
