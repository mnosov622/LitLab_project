const express = require("express");
const { ObjectId } = require("mongodb");
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

router.get("/:email", (req, res) => {
  console.log("EMAIL is", req.params.email);

  User.findOne({ email: req.params.email })
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

router.delete("/:id/courses", async (req, res) => {
  try {
    const id = req.params.id;
    const db = client.db("users");
    const userCollection = db.collection("users");

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.courses = []; // clear the courses array

    await user.save(); // save the updated user to the database

    res.status(200).json({ message: "Courses deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

//notes
router.post("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const noteText = req.body.notebody;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { notes: noteText } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ updatedUser });
});

router.delete("/notes/:id", (req, res) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(
    userId,
    { $unset: { notes: 1 } },
    { new: true },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to remove notes" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    }
  );
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

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
