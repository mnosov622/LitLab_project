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

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const lastNote = user.notes[user.notes.length - 1];
  const lastNoteId = lastNote ? lastNote.id : 0;
  const newNoteId = lastNoteId + 1;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { notes: { text: noteText, id: newNoteId } } },
    { new: true }
  );

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

//delete single note
router.delete("/notes/:userId/:noteId", async (req, res) => {
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const noteIndex = user.notes.findIndex(
      (note) => String(note.id) === String(noteId)
    );
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    user.notes.splice(noteIndex, 1);
    await user.save();

    res.status(200).json({ message: "Note removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove note" });
  }
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

router.post("/withdrawals", (req, res) => {
  const email = "admin@gmail.com";
  const withdrawalData = req.body;

  const db = client.db("users");
  const users = db.collection("users");

  users.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to find user");
      return;
    }

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    if (!user.withdrawals) {
      user.withdrawals = [];
    }

    user.withdrawals.push(withdrawalData);

    users.updateOne(
      { email },
      { $set: { withdrawals: user.withdrawals } },
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Failed to update user");
          return;
        }

        res.status(200).send("Withdrawal information added successfully");
      }
    );
  });
});

router.put("/moneyEarned/:email", (req, res) => {
  const email = req.params.email;
  console.log("email", email);
  User.findOneAndUpdate(
    { email: email },
    { $set: { moneyEarned: 0 } },
    { new: true },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.status(200).json(user);
    }
  );
});

router.delete("/withdrawals/:email", (req, res) => {
  const email = req.params.email;

  User.findOneAndUpdate(
    { email: "admin@gmail.com" },
    { $pull: { withdrawals: { userEmail: email } } },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error finding user");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send("Withdrawal request removed successfully");
    }
  );
});

const nodemailer = require("nodemailer");

//send email

// create reusable transporter object using the default SMTP transport

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "litlab200@gmail.com",
    pass: "fbwvydwfqefelrmb",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/withdraw/notify", (req, res) => {
  const { userEmail, amount } = req.body;
  const mailData = {
    from: "litlab200@gmail.com",
    to: userEmail,
    subject: "Your withdraw request was approved",
    text: text,
    html: `
    <style>
    .contact-message {
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      margin: 20px;
      max-width: 500px;
    }
    
    .contact-message h2 {
      font-size: 24px;
      margin-top: 0;
    }
    
    .contact-message p {
      font-size: 18px;
      margin: 10px 0;
    }
    
    .contact-message strong {
      font-weight: bold;
    }
    </style>
    <div class="contact-message">
    <h2>Success</h2>
   <p>Your request to withdraw ${amount} was approved</p>
  </div>`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
      return console.log(error);
    }
    res.status(200).send({
      message: "Mail send",
      message_id: info.messageId,
      success: true,
    });
  });
});

module.exports = router;

module.exports = router;
