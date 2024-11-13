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

  const course = await Course.findById(req.data.courseId);
  if (!course) throw Error("Course Not found");
  if (req.data.user.id != course.userId) throw Error("User not Authorised");
  if (req.data.data) {
    course.data = req.data.data;
  }
  if (req.data.name) {
    course.name = req.data.name;
  }
  if (req.data.about) {
    course.about = req.data.about;
  }
  if (req.data.description) {
    course.description = req.data.description;
  }
  if (req.data.price) {
    course.price = req.data.price;
  }
  if (req.data.expectedTime) {
    course.expectedTime = req.data.expectedTime;
  }
  if (req.data.imageUrl) {
    course.imageUrl = req.data.imageUrl;
  }
  // [ ]
  await course.save();
  return NextResponse.json({ success: true });
});
