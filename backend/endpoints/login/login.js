const express = require("express");
const router = express.Router();
const client = require("../../mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = "secret";

router.post("/", (req, res) => {
  client.connect(async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error connecting to database" });
    }
    const db = client.db("users");
    const { email, password } = req.body;

    db.collection("users").findOne(
      { email: req.body.email },
      async function (err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (user.isAdmin) {
          if (
            user.password !== req.body.password ||
            user.email !== req.body.email
          ) {
            return res.status(401).json({ message: "Incorrect credentials" });
          }

          const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user?.isAdmin,
          };
          const token = jwt.sign(payload, secret, { expiresIn: "24h" });

          res.status(200).send({ user, token });

          return 0;
        }
        const hashedPassword = user?.password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (!match || user.email !== req.body.email) {
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
  });
});

module.exports = router;
