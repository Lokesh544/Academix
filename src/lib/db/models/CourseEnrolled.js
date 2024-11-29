import mongoose from "mongoose";

const courseEnrollmentSchema = mongoose.Schema({
  courseId: String,
  userId: String,
});

const CourseEnrollment =
  mongoose.models.CourseEnrollment ||
  mongoose.model("CourseEnrollment", courseEnrollmentSchema);

export default CourseEnrollment;
