const mongoose = require("mongoose");
const url =
  "mongodb+srv://litlab200:litlab@cluster0.fbncwuq.mongodb.net/courses";
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

module.exports = {
  User,
};
