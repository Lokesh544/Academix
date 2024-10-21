import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  userId: String,
  name: String,
  about: String,
  description: String,
  price: String,
  expectedTime: String,
  imageUrl: String,
  data: { type: String, default: '{"titleImg": "", "modules": []}' },
  rating: { type: Number, default: 1 },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
