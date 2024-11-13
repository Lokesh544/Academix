"use client";

import CourseModuleListItem from "@/components/basic/CourseModuleListItem";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import ListRender from "@/components/utils/ListRender";
import UserAvatar from "@/components/utils/UserAvatar";
import { data } from "@/data";
import { praseHttps, praseNumberToString } from "@/lib/utils";
import getCourse from "@/lib/utils/course/getCourse";
import getUserFromId from "@/lib/utils/user/getUserFromId";
import getUserId from "@/lib/utils/user/getUserId";
import { localdata } from "@/localdata";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Course({ id }) {
  const [course, setCourse] = useState({
    about: "-----",
    description: "------",
    expectedTime: "----",
    imageUrl: "",
    name: "----",
    price: "---",
    rating: 1,
    userId: "--",
    _id: "--",
    students: 0,
    data: {
      modules: [],
      titleImg: "",
    },
    instructor: {
      name: "----",
      about: "----",
      img: data.defaultUserProfileImg,
      role: 1,
    },
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window != "undefined") {
      (async () => {
        await getCourse(id, localdata.username(), localdata.password())
          .then(async (course) => {
            course.instructor = {
              name: "",
              about: "",
              img: data.defaultUserProfileImg,
              role: 1,
            };
            course.students = 0;
            course.data = JSON.parse(course.data);
            setCourse(course);
            await getUserFromId(
              localdata.username(),
              localdata.password(),
              course.userId
            )
              .then((user) => {
                const newC = course;
                newC.instructor = user;
                setCourse(newC);
              })
              .catch((err) => {
                console.log(err);
              });
            // TODO Get number of students
          })
          .catch((err) => {
            console.log(err);
          });
        await getUserId(localdata.username(), localdata.password())
          .then((userId) => {
            setUserId(userId);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, []);

  console.log(course);

  return (
    <div className="space-y-6 my-2">
      <div className="">
        <Image
          className="rounded"
          src={
            course.data.titleImg && course.data.titleImg != ""
              ? praseHttps(course.data.titleImg)
              : data.defaultCourseTitleImg
          }
          alt="Title Img"
          width="1920"
          height="1080"
        />
      </div>
      <div>
        <TypographyH1>{course.name}</TypographyH1>
        <TypographyP>{course.about}</TypographyP>
        <div className="flex items-center gap-2 my-2">
          <UserAvatar
            user={course.instructor}
            fallbackClassName="bg-transparent"
          />
          <div>
            <p className="font-medium leading-none">{course.instructor.name}</p>
            <p className="text-xs text-muted-foreground">
              {course.instructor.about}
            </p>
          </div>
        </div>
      </div>
      {/* TODO Enroll Course Button */}
      <div>
        <Button variant="secondary" size="lg">
          <TypographyH4>Enroll</TypographyH4>
        </Button>
        <p>{praseNumberToString(course.students)} already enrolled</p>
      </div>
      {/* TODO Edit Course Button */}
      {course.userId == userId && (
        <div className="h idden flex gap-4">
          <Link href={`./${id}/edit`}>
            <Button variant="secondary" size="lg">
              <TypographyH4>Edit Course</TypographyH4>
            </Button>
          </Link>
          <Link href={`./${id}/edit/card`}>
            <Button variant="secondary" size="lg">
              <TypographyH4>Edit Course Card</TypographyH4>
            </Button>
          </Link>
        </div>
      )}
      <div>
        <TypographyP>{course.description}</TypographyP>
      </div>
      <div>
        <TypographyH2>
          You have{" "}
          {praseNumberToString(
            course.data?.modules?.length
              ? course.data?.modules?.length > 0
                ? course.data.modules.length
                : "No"
              : "No"
          )}{" "}
          {course.data?.modules?.length
            ? course.data?.modules?.length > 1
              ? "Modules "
              : "Module "
            : "Module "}
          in this Course
        </TypographyH2>
        <div>
          <ListRender
            className="p-2"
            data={course.data?.modules || []}
            ItemRender={CourseModuleListItem}
            dividers={true}
          />
        </div>
      </div>
    </div>
  );
}
