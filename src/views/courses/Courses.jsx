"use client";

import CourseCard from "@/components/basic/CourseCard";
import { TypographyH1 } from "@/components/ui/typography";
import CardRender from "@/components/utils/CardRender";
import SearchBar from "@/components/utils/SearchBar";
import getCourses from "@/lib/utils/course/getCourses";
import getUser from "@/lib/utils/user/getUser";
import { localdata } from "@/localdata";
import { useEffect, useState } from "react";

export default function Courses({ search }) {
  const [courses, setCourses] = useState([
    {
      instructor: {
        name: "Ebou Jobe",
        about: "Developer",
        img: "https://github.com/shadcn.png",
        role: 1,
      },
      id: 231234,
      rating: 3,
      students: 100,
    },
    {
      instructor: {
        name: "Ebou Jobe",
        about: "Developer",
        role: 1,
      },
      id: 231234,
      rating: 3,
      students: 100,
    },
    {
      instructor: {
        name: "Ebou Jobe",
        about: "Developer",
        role: 1,
      },
      id: 231234,
      rating: 3,
      students: 100,
    },
    {
      instructor: {
        name: "Ebou Jobe",
        about: "Developer",
        role: 1,
      },
      id: 231234,
      rating: 3,
      students: 100,
    },
    {
      instructor: {
        name: "Ebou Jobe",
        about: "Developer",
        role: 1,
      },
      id: 231234,
      rating: 3,
      students: 100,
    },
  ]);

  useEffect(() => {
    if (typeof window != "undefined") {
      getCourses(localdata.username(), localdata.password(), search)
        .then((res) => res.json())
        .then((res) => {
          if (res.courses) return res.courses;
          else throw Error(res.error);
        })
        .then(async (courses) => {
          for (let i in courses) {
            courses[i].instructor = await getUser(
              localdata.username(),
              localdata.password(),
              courses[i].userId
            )
              .then((res) => res.json())
              .then((res) => {
                if (res.user) return res.user;
                else throw Error(res.error);
              });
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

  console.log(courses);

  return (
    <div>
      <TypographyH1 className="capitalize text-center my-8">
        courses
      </TypographyH1>
      <SearchBar />
      <CardRender data={courses} ItemRender={CourseCard} className="my-16" />
    </div>
  );
}
