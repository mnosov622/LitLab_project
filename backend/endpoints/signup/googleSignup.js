const express = require("express");
const router = express.Router();
const client = require("../../mongodb");

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

        const user = {
          name: req.body.name,
          email: req.body.email,
          token: req.body.token,
          isLearner: req?.body?.isLearner,
        };
        db.collection("users").insertOne(user, function (err, user) {
          if (err) throw err;

          console.log("user inserted", user);
          res.status(200).send({ user });
          db.close();
        });
      }
    });
});

module.exports = router;
