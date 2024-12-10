import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  const course = new Course({
    userId: req.data.user._id,
    name: req.data.name,
    imageUrl: req.data.imageUrl,
    about: req.data.about,
    description: req.data.description,
    price: req.data.price,
    expectedTime: req.data.expectedTime,
  });

  await course.save();
  return NextResponse.json({ course });
});
