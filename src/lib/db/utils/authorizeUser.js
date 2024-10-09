import dbConnect from "../dbConnect";
import User from "../models/User";

/**
 *
 * @output the req.data.user will contain the user.
 *
 * @param {Request} req pass the Request Stream to authorize the user.
 */
export default async function authorizeUser(req) {
  await dbConnect();
  const users = await User.find({ username: req.data.username });
  if (users.length <= 0) throw new Error("User Not Found!");
  if (users[0].password != req.data.userpassword)
    throw new Error("Wrong Password!");
  req.data.user = users[0];
}
