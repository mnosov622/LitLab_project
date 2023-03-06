const mongoose = require("mongoose");
const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net/courses";
const multer = require("multer");
const path = require("path");

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });


const userSchema = new mongoose.Schema({
  profileImage: { type: Buffer },
  bio: { type: String },
});

const User = mongoose.model("User", userSchema);


  // Insert new user profile into database
const newProfile = new UserProfile({
  profileImage: 'John Doe',
  bio: 'I am a software developer.'
});
newProfile.save((err, profile) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Profile saved successfully:', profile);
  }
});

UserProfile.findOne({ profileImage: 'John Doe' }, (err, profile) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Profile found:', profile);
  }
});

module.exports = {
  User,
};
