import dbConnect from "@/lib/db/dbConnect";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  return NextResponse.json({ userId: req.data.user._id });
});
