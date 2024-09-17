import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  about: String,
  img: String,
  role: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
