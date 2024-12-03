import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  if (
    (await User.find({ username: data.get("username")?.toLowerCase() }))
      .length > 0
  )
    return NextResponse.json({ error: "User Already Exists" });
  const user = new User({
    username: data.get("username").toLowerCase(),
    password: data.get("password"),
    name: data.get("username"),
    role: parseInt(data.get("role")),
  });
  //[ ]
  await user.save();
  return NextResponse.json({ msg: "Success", user: user });
});
