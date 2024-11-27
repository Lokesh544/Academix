"use client";

import CourseCard from "@/components/basic/CourseCard";
import { TypographyH1 } from "@/components/ui/typography";
import CardRender from "@/components/utils/CardRender";
import SearchBar from "@/components/utils/SearchBar";
import getCourses from "@/lib/utils/course/getCourses";
import getUserFromId from "@/lib/utils/user/getUserFromId";
import { localdata } from "@/localdata";
import { useEffect, useState } from "react";

export default function Courses({ search }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (typeof window != "undefined") {
      getCourses(search)
        .then(async (courses) => {
          for (let i in courses) {
            courses[i].data = JSON.parse(courses[i].data);
            courses[i].instructor = await getUserFromId(
              localdata.username(),
              localdata.password(),
              courses[i].userId
            );
            // TODO
            courses[i].stars = 2;
            courses[i].students = 100;
          }
          setCourses(courses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-20rem)]">
      <TypographyH1 className="capitalize text-center my-8">
        Courses
      </TypographyH1>
      <SearchBar />
      <CardRender
        data={courses}
        ItemRender={CourseCard}
        className="my-16"
        placeholder="No Course Found"
      />
    </div>
  );
}
