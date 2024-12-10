import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import CourseEnrollment from "@/lib/db/models/CourseEnrolled";
import User from "@/lib/db/models/User";
import EscapeRegex from "@/lib/db/utils/EscapeRegex";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";
import { NextResponse } from "next/server";

export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);

  const user = await User.findById(req.data.userId).catch((e) => {
    throw new Error("No User Found");
  });

  const nameRegex = new RegExp(EscapeRegex(req.data.search || ""), "gi");

  const courseEnrollments = await CourseEnrollment.find({
    userId: user._id,
  });
  const courseList = [];
  for (let enroll of courseEnrollments) {
    courseList.push(
      await Course.find({ _id: enroll.courseId, name: nameRegex }).then(
        (res) => {
          if (res.length > 0) return res[0];
        }
      )
    );
  }
  return NextResponse.json({ courseList });
});
