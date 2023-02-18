const express = require("express");
const { User } = require("../models/users");
const client = require("../mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = client.db("users");
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
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
  try {
    const email = req.params.email;
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
