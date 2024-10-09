import dbConnect from "@/lib/db/dbConnect";
import Notes from "@/lib/db/models/Notes";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  const notes = new Notes({
    userId: req.data.user._id,
    name: req.date.name,
    data: req.data.notesData,
  });

  //[ ] await notes.save();
  return NextResponse({ notes });
});
