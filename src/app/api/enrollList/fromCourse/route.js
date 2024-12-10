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

  const course = await Course.findById(req.data.courseId).catch((e) => {
    throw new Error("No Course Found");
  });

  const courseEnrollments = await CourseEnrollment.find({
    courseId: course._id,
  });
  const userList = [];
  for (let enroll of courseEnrollments) {
    userList.push(await User.findById(enroll.userId).catch(() => {}));
  }
  return NextResponse.json({ userList });
});
