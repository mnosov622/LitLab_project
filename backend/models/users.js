const mongoose = require("mongoose");
const url = "mongodb+srv://litlab200:litlab@cluster0.fbncwuq.mongodb.net/users";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  isLearner: { type: Boolean, required: false },
  isCreator: { type: Boolean, required: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Number },
  profileImage: { type: String },
  bio: { type: String },
  description: { type: String },
  education: { type: String },
  social: { type: String },
  moneyEarned: { type: Number },
  withdrawals: [
    {
      cardNumber: String,
      cardHolderName: String,
      expirationDay: String,
      expirationMonth: String,
      expirationYear: String,
      amount: Number,
      userEmail: String,
      userName: String,
      date: String,
    },
  ],
  reviews: [
    {
      name: String,
      emai: String,
      course: String,
      star: String,
    },
  ],
  notes: [
    {
      text: String,
      id: Number,
      noteDate: String,
    },
  ],
  courses: [
    {
      id: { type: Number, required: true },
      courseName: { type: String, required: true },
      instructor: { type: String, required: true },
      courseImage: { type: String, required: true },
      price: { type: String, required: true },
      isCompleted: { type: Boolean },
      notes: [{ type: String }],
    },
  ],
});

const User = mongoose.model("users", userSchema, "users");

module.exports = {
  User,
};
