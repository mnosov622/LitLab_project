const express = require("express");
const { User } = require("../models/users");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net";

router.get("/", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("users");
      db.collection("users")
        .find({})
        .toArray((err, users) => {
          if (err) throw err;
          res.json(users);
          client.close();
        });
    }
  );
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//remove the user, functionality for admin only
//TODO: Protect the route, so that only admin can do that
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  console.log("email is", email);
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error connecting to database: " + err });
    }

    const db = client.db("users");
    const usersCollection = db.collection("users");

    usersCollection.find().toArray((err, users) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error finding users");
      } else {
        let deletedUser = null;
        users.forEach((user) => {
          if (user.email === email) {
            deletedUser = user;
            usersCollection.deleteOne({ email: email }, (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error deleting user");
              } else {
                res.send("User deleted successfully");
              }
            });
          }
        });

        if (deletedUser === null) {
          res.status(404).send("User not found");
        }
      }
    });
  });
});

module.exports = router;
