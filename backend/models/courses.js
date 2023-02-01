// const mongoose = require("mongoose");
// const url = "mongodb+srv://max:LitLab@cluster0.qnyvkxl.mongodb.net/courses";

// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Successfully connected to MongoDB."))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// const courseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   instructor: { type: String, required: true },
//   instructorId: { type: Number, required: true },
//   instructorBio: { type: String, required: true },
//   price: { type: Number, required: true },
//   rating: { type: Number, required: true },
//   enrollments: { type: Number, required: true },
//   shortDescription: { type: String, required: true },
//   longDescrption: { type: String, required: true },
//   courseImageURL: { type: String, required: true },
//   instructorImageURL: { type: String, required: true },
//   instructorDescription: { type: String, required: true },
//   pointsToLearn: { type: Array, required: true },
//   pointsSummary: { type: String, required: true },
//   courseContent: { type: Array, required: true },
//   test: { type: Array, required: true },
// });

// const Course = mongoose.model("courses", courseSchema, "courses");

// module.exports = {
//   Course,
// };
