import mongoose from "mongoose";

const userEnrollmentSchema = mongoose.Schema({
  userId: String,
  courses: { type: [String], default: [] },
});

const UserEnrollment =
  mongoose.models.UserEnrollment ||
  mongoose.model("UserEnrollment", userEnrollmentSchema);

export default UserEnrollment;
