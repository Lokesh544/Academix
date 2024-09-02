import mongoose from "mongoose";

export interface userSchema {
  username: string;
  password: string;
  name: string;
  about?: string;
  img?: string;
  role?: 0 | 1;
}

const userSchema = new mongoose.Schema<userSchema>({
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

const User =
  mongoose.models.User<userSchema> ||
  mongoose.model<userSchema>("User", userSchema);

export default User;
