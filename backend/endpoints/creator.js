const express = require("express");
const { ObjectId } = require("mongodb");
const { creator } = require("../models/creator");
const { User } = require("../models/users");
const client = require("../mongodb");
const router = express.Router();
const multer = require("multer");
const storage = new multer.memoryStorage();
const upload = multer({ storage });
const mongodb = require("mongodb");

// Route handler for accepting user data
router.post("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const db = client.db("users");
    const bucket = new mongodb.GridFSBucket(db);
    const storage = new multer.memoryStorage();

    let profileImage = undefined;
    if (req.file) {
      const imageUploadStream = bucket.openUploadStream(req.file.originalname);
      imageUploadStream.write(req.file.buffer);
      imageUploadStream.end();
      profileImage = req.file.originalname;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        profileImage: profileImage,
        bio: req.body.bio,
        social: req.body.social,
        description: req.body.description,
      },
      { new: true }
    );

    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.send("User updated in database");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error updating user");
  }
});

//TODO: data is not updating
router.post("/:email", upload.single("profileImage"), async (req, res) => {
  try {
    console.log("email", req.params.email);
    const db = client.db("courses");
    const bucket = new mongodb.GridFSBucket(db);
    const storage = new multer.memoryStorage();

    let profileImage = undefined;
    if (req.file) {
      const imageUploadStream = bucket.openUploadStream(req.file.originalname);
      imageUploadStream.write(req.file.buffer);
      imageUploadStream.end();
      profileImage = req.file.originalname;
    }

    const collection = db.collection("courses");

    collection
      .updateOne(
        { email: req.params.email }, // filter to match the document to update
        {
          $set: {
            instructorImageURL: profileImage,
            instructorBio: req.body.bio,
            social: req.body.social,
            instructorDescription: req.body.description,
          },
        }
      )
      .then((updatedDocument) => {
        // handle success
      })
      .catch((error) => {
        // handle error
      });

    return res.send("User updated in database");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error updating user");
  }
});

// Route handler for retrieving user data
router.get("/users/:id", (req, res) => {
  // Find the user document by ID
  const userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (!user) {
      res.sendStatus(404);
    } else {
      // Convert the profile image data to a Base64-encoded string
      const imageData = user.profileImage.toString("base64");

      // Send the user data as a JSON object to the frontend
      res.json({
        id: user._id,
        profileImage: imageData,
        bio: user.bio,
      });
    }
  });
});

module.exports = router;
