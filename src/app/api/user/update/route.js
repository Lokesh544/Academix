import dbConnect from "@/lib/db/dbConnect";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  if (req.data.name) req.data.user.name = req.data.name;
  if (req.data.about) req.data.user.about = req.data.about;
  if (req.data.img) req.data.user.img = req.data.img;
  await req.data.user.save();

  return NextResponse.json({ user: req.data.user });
});
