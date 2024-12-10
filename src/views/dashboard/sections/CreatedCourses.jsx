"use client";

import { Button } from "@/components/ui/button";
import Section from "@/components/wrappers/Section";
import Link from "next/link";
import CardRender from "@/components/utils/CardRender";
import CourseCard from "@/components/basic/CourseCard";
import { useEffect, useState } from "react";
import getUserFromId from "@/lib/utils/user/getUserFromId";
import getEnrolledUsersInCourse from "@/lib/utils/course/getEnrolledUsersInCourse";
import getUserId from "@/lib/utils/user/getUserId";
import { localdata } from "@/localdata";
import getCoursesByUser from "@/lib/utils/course/getCoursesByUser";

export default function CreatedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined") {
      (async () => {
        const userId = await getUserId(
          localdata.username(),
          localdata.password()
        );
        getCoursesByUser(userId, localdata.username(), localdata.password())
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
        getUserFromId(userId).then((user) => {
          if (user.role == 0) {
            setStudent(true);
          }
        });
      })();
    }
  }, []);

  if (student) return;
  return (
    <Section>
      <div className="flex justify-between">
        <h3 className="text-xl md:text-4xl lg:text-5xl font-bold inline-block">
          Created
          <span className="text-secondary ml-4">Courses</span>
        </h3>
        <Button asChild className="bg-secondary hover:bg-secondary/90">
          <Link href="/dashboard/createdCourses">Explore All</Link>
        </Button>
      </div>
      <CardRender
        data={courses}
        ItemRender={CourseCard}
        placeholder={loading ? "Loading..." : "No Course Found"}
      />
    </Section>
  );
}
