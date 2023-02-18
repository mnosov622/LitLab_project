const express = require("express");
const client = require("../../mongodb");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const db = client.db("users");
  db.collection("users")
    .find({})
    .toArray(async (err, users) => {
      const user = users.find((u) => u.email === req.body.email);
      if (user) {
        console.log("USER ALREADY EXISTS");
        return res.status(409).send("User exists");
      } else {
        console.log("user doesn't exists");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("Hashed password", hashedPassword);

        const user = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          subject: req.body.subject,
          education: req.body.education,
          isCreator: req?.body?.isCreator,
        };
        db.collection("users").insertOne(user, function (err, user) {
          console.log("user inserted", user);
          res.status(200).send({ user });
        });
      }
    });
});

module.exports = router;
