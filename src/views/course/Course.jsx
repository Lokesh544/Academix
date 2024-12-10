"use client";

import CourseModuleListItem from "@/components/basic/CourseModuleListItem";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import ListRender from "@/components/utils/ListRender";
import UserAvatar from "@/components/utils/UserAvatar";
import { data } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { parseHttps, parseNumberToString, textToParagraph } from "@/lib/utils";
import getCourse from "@/lib/utils/course/getCourse";
import postCheckEnrolledCourse from "@/lib/utils/course/postCheckEnrolledCourse";
import postEnrollCourse from "@/lib/utils/course/postEnrollCourse";
import getEnrolledUsersInCourse from "@/lib/utils/course/getEnrolledUsersInCourse";
import postUnenrollCourse from "@/lib/utils/course/postUnenrollCourse";
import CheckLogin from "@/lib/utils/user/checkLogin";
import getUserFromId from "@/lib/utils/user/getUserFromId";
import getUserId from "@/lib/utils/user/getUserId";
import { localdata } from "@/localdata";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Course({ id }) {
  const { toast } = useToast();
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
  const [enrolled, setEnrolled] = useState(false);

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
            course.students = (await getEnrolledUsersInCourse(id)).length;
            course.data = JSON.parse(course.data);
            setCourse(course);
            await getUserFromId(course.userId)
              .then((user) => {
                const newC = course;
                newC.instructor = user;
                setCourse(newC);
              })
              .catch((err) => {
                console.log(err);
              });
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
        await postCheckEnrolledCourse(
          id,
          localdata.username(),
          localdata.password()
        )
          .then((res) => {
            setEnrolled(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, []);

  async function Enroll() {
    try {
      const res = await postEnrollCourse(
        id,
        localdata.username(),
        localdata.password()
      );
      setEnrolled(true);
      const newCourse = course;
      newCourse.students += 1;
      setCourse(newCourse);
      toast({
        description: "Enrolled Successfully",
      });
    } catch (err) {
      toast({
        description: err.message,
      });
    }
  }

  async function UnEnroll() {
    try {
      const res = await postUnenrollCourse(
        id,
        localdata.username(),
        localdata.password()
      );
      setEnrolled(false);
      const newCourse = course;
      newCourse.students -= 1;
      setCourse(newCourse);
      toast({
        description: "Unenrolled Successfully",
      });
    } catch (err) {
      toast({
        description: err.message,
      });
    }
  }

  return (
    <div className="space-y-6 my-2">
      <CheckLogin />
      <div className="">
        <Image
          className="rounded"
          src={
            course.data.titleImg && course.data.titleImg != ""
              ? parseHttps(course.data.titleImg)
              : data.defaultCourseTitleImg
          }
          alt="Title Img"
          width="1920"
          height="1080"
        />
      </div>
      <div>
        <TypographyH1 className="hidden md:block">{course.name}</TypographyH1>
        <TypographyH3 className="block md:hidden">{course.name}</TypographyH3>
        <TypographyP className="max-md:text-sm">{course.about}</TypographyP>
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
      <div>
        {enrolled ? (
          <Button variant="secondary" size="lg" onClick={UnEnroll}>
            <TypographyH4>Unenroll</TypographyH4>
          </Button>
        ) : (
          <Button variant="secondary" size="lg" onClick={Enroll}>
            <TypographyH4>Enroll</TypographyH4>
          </Button>
        )}
        <p>{parseNumberToString(course.students)} already enrolled</p>
      </div>
      {course.userId == userId && (
        <div className="flex flex-col md:flex-row gap-4">
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
        <TypographyP className="max-md:text-sm">
          {textToParagraph(course.description)}
        </TypographyP>
      </div>
      <div>
        <TypographyH2 className="max-md:text-lg">
          You have{" "}
          {parseNumberToString(
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
