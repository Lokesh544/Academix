import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import CourseEnrollment from "@/lib/db/models/CourseEnrolled";
import User from "@/lib/db/models/User";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);

  const user = await User.findById(req.data.userId).catch((e) => {
    throw new Error("No User Found");
  });

  const courseEnrollments = await CourseEnrollment.find({
    userId: user._id,
  });
  const courseList = [];
  for (let enroll in courseEnrollments) {
    courseList.push(await Course.findById(enroll.courseId).catch(() => {}));
  }
  return NextResponse.json({ courseList });
});
