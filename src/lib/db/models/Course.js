import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  userId: String,
  name: String,
  about: String,
  price: String,
  expectedTime: String,
  data: String,
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
