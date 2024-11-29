import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const GET = TryCatch(async (req) => {
  await dbConnect();
  const data = new URL(req.url).searchParams;
  const users = await User.find({
    username: data.get("username")?.toLowerCase(),
  });
  if (users.length == 0) return NextResponse.json({ error: "User Not Found" });
  if (users[0].password != data.get("password"))
    return NextResponse.json({ error: "Wrong Password!!" });
  return NextResponse.json({ user: users[0] });
});
