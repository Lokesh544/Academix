"use client";

import { Button } from "@/components/ui/button";
import Section from "@/components/wrappers/Section";
import Link from "next/link";
import CardRender from "@/components/utils/CardRender";
import CourseCard from "@/components/basic/CourseCard";
import { useEffect, useState } from "react";
import getCourses from "@/lib/utils/course/getCourses";
import { localdata } from "@/localdata";
import getUserFromId from "@/lib/utils/user/getUserFromId";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (typeof window != "undefined") {
      getCourses()
        .then(async (courses) => {
          for (let i in courses) {
            courses[i].data = JSON.parse(courses[i].data);
            courses[i].instructor = await getUserFromId(
              courses[i].userId
            );
            // TODO
            courses[i].stars = 2;
            courses[i].students = 100;
          }
          courses = courses.slice(0, 5);
          setCourses(courses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Section>
      <h3 className="text-xl md:text-4xl lg:text-5xl font-bold inline-block">
        Popular
        <span className="text-secondary ml-4">Courses</span>
      </h3>
      <CardRender data={courses} ItemRender={CourseCard} />
      <div className="flex justify-center">
        <Button asChild className="bg-secondary hover:bg-secondary/90">
          <Link href="/courses">Explore All Courses</Link>
        </Button>
      </div>
    </Section>
  );
}
