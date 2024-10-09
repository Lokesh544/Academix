import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import CourseEnrollment from "@/lib/db/models/CourseEnrolled";
import UserEnrollment from "@/lib/db/models/UserEnrolled";
import authorizeUser from "@/lib/db/utils/authorizeUser";
import getData from "@/lib/db/utils/GetData";
import TryCatch from "@/lib/db/utils/TryCatch";

// TODO To complete
export const POST = TryCatch(async (req) => {
  await dbConnect();
  await getData(req);
  await authorizeUser(req);

  const course = await Course.findById(req.data.courseId);

  const userEnrollment = await UserEnrollment.find({
    userId: req.data.user._id,
  });
  const courseEnrollment = await CourseEnrollment.find({
    courseId: course._id,
  });
});
