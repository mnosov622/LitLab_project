const express = require("express");
const { ObjectId } = require("mongodb");
const { creator } = require("../models/creator");
const client = require("../mongodb");
const router = express.Router();

// Route handler for accepting user data
router.post('/users', upload.single('profileImage'), (req, res) => {
    // Read the uploaded file from the temporary location
    const filePath = path.join(__dirname, '..', req.file.path);
    const fileData = fs.readFileSync(filePath);
  
    // Find the user document by ID
    const userId = req.body.userId;
    User.findOneAndUpdate(
      { _id: userId },
      {
        profileImage: fileData,
        bio: req.body.bio
      },
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else if (!user) {
          res.sendStatus(404);
        } else {
          res.send('User updated in database');
        }
      }
    );
});

// Route handler for retrieving user data
router.get('/users/:id', (req, res) => {
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
        const imageData = user.profileImage.toString('base64');
  
        // Send the user data as a JSON object to the frontend
        res.json({
          id: user._id,
          profileImage: imageData,
          bio: user.bio
        });
      }
    });
  });
  