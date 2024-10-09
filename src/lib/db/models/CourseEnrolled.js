import mongoose from "mongoose";

const courseEnrollmentSchema = mongoose.Schema({
  courseId: String,
  users: { type: [String], default: [] },
});

const CourseEnrollment =
  mongoose.models.CourseEnrollment ||
  mongoose.model("CourseEnrollment", courseEnrollmentSchema);

export default CourseEnrollment;
