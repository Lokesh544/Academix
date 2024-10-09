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
    name: req.date.name,
    about: req.data.about,
    price: req.data.price,
    expectedTime: req.data.expectedTime,
    data: req.data.courseData,
  });

  //[ ] await course.save();
  return NextResponse({ course });
});
