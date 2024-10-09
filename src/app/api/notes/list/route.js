import dbConnect from "@/lib/db/dbConnect";
import Notes from "@/lib/db/models/Notes";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  const nameRegex = new RegExp(EscapeRegex(req.data.search || ""), "gi");
  const notes = Notes.find({ name: nameRegex });

  return NextResponse({ notes });
});
