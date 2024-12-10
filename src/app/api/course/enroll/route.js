import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import CourseEnrollment from "@/lib/db/models/CourseEnrolled";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  const course = await Course.findById(req.data.courseId).catch((e) => {
    throw new Error("No Course Found");
  });

  const courseEnrollments = await CourseEnrollment.find({
    courseId: course._id,
    userId: req.data.user._id,
  });
  if (courseEnrollments.length > 0)
    return NextResponse.json({ enroll: courseEnrollments[0] });

  const courseEnrollment = new CourseEnrollment({
    courseId: course._id,
    userId: req.data.user._id,
  });

  await courseEnrollment.save();
  return NextResponse.json({ enroll: courseEnrollment });
});
