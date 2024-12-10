"use client";

import CourseCard from "@/components/basic/CourseCard";
import { TypographyH1 } from "@/components/ui/typography";
import CardRender from "@/components/utils/CardRender";
import SearchBar from "@/components/utils/SearchBar";
import getEnrolledCoursesByUser from "@/lib/utils/course/getEnrolledCoursesByUser";
import getEnrolledUsersInCourse from "@/lib/utils/course/getEnrolledUsersInCourse";
import getUserFromId from "@/lib/utils/user/getUserFromId";
import getUserId from "@/lib/utils/user/getUserId";
import { localdata } from "@/localdata";
import { useEffect, useState } from "react";

export default function EnrolledCourses({ search }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window != "undefined") {
      (async () => {
        const userId = await getUserId(
          localdata.username(),
          localdata.password()
        );
        getEnrolledCoursesByUser(userId, search)
          .then(async (courses) => {
            for (let i in courses) {
              courses[i].data = JSON.parse(courses[i].data);
              courses[i].instructor = await getUserFromId(courses[i].userId);
              courses[i].students = (
                await getEnrolledUsersInCourse(courses[i]._id)
              ).length;
              // TODO
              courses[i].stars = 2;
            }
            courses = courses.slice(0, 5);
            setCourses(courses);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })();
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-20rem)]">
      <TypographyH1 className="capitalize text-center my-8">
        Enrolled Courses
      </TypographyH1>
      <SearchBar action="/dashboard/enrolledCourses" defaultValue={search} />
      <CardRender
        data={courses}
        ItemRender={CourseCard}
        className="my-16"
        placeholder={loading ? "Loading..." : "No Course Found"}
      />
    </div>
  );
}
