import dbConnect from "@/lib/db/dbConnect";
import User, { userSchema } from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req: Request) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  if (
    (await User.find({ username: data.get("username")?.toLowerCase() }))
      .length > 0
  )
    return NextResponse.json({ error: "User Allready Exists" });
  const user: HydratedDocument<userSchema> = new User({
    username: (data.get("username") as string).toLowerCase(),
    password: data.get("password") as string,
    name: data.get("username") as string,
  });
  //[ ]
  await user.save();
  return NextResponse.json({ msg: "Success", user: user });
});
