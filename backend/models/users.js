const mongoose = require("mongoose");
const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net/users";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isLearner: { type: Boolean, required: false },
  isCreator: { type: Boolean, required: false },
  courses: [
    {
      id: { type: Number, required: true },
      courseName: { type: String, required: true },
      instructor: { type: String, required: true },
      courseImage: { type: String, required: true },
      price: { type: String, required: true },
      isCompleted: { type: Boolean },
    },
  ],
});

const User = mongoose.model("users", userSchema, "users");

module.exports = {
  User,
};
