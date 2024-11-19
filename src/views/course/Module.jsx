"use client";

import LessonView0 from "@/components/course/LessonView0";
import LessonView1 from "@/components/course/LessonView1";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { data } from "@/data";
import getCourse from "@/lib/utils/course/getCourse";
import { localdata } from "@/localdata";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Module({ id, module }) {
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
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(0);
  module = Number.parseInt(module);

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
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, []);

  function onClickNextLesson() {
    if (lesson + 1 < course.data.modules[module].lessons.length)
      setLesson(lesson + 1);
  }
  function onClickPreviousLesson() {
    if (lesson > 0) setLesson(lesson - 1);
  }
  const nextModuleHref = `../${id}/${module + 1}`;
  const previousModuleHref = `../${id}/${module - 1}`;

  return (
    <div className="min-h-[calc(100vh-20rem)] flex flex-col pt-6">
      {loading ? (
        <div className="m-auto">
          <TypographyH1>Loading...</TypographyH1>
        </div>
      ) : course.data.modules && course.data.modules.length > 0 ? (
        <>
          <div className="grow">
            {course.data.modules[module].lessons &&
            course.data.modules[module].lessons.length > 0 ? (
              <Lessons
                lesson={course.data.modules[module].lessons[lesson]}
                lessonId={lesson}
              />
            ) : (
              "No Lesson Found!"
            )}
          </div>
          <div className="flex justify-between">
            {lesson > 0 ? (
              <Button variant="secondary" onClick={onClickPreviousLesson}>
                <ArrowBigLeftIcon /> Previous
              </Button>
            ) : module > 0 ? (
              <Button asChild variant="secondary">
                <Link href={previousModuleHref}>
                  <ArrowBigLeftIcon /> Previous Module
                </Link>
              </Button>
            ) : (
              <div />
            )}
            <Button asChild variant="secondary">
              <Link href={"."}>Go Back to Course</Link>
            </Button>
            {lesson + 1 < course.data.modules[module].lessons.length ? (
              <Button variant="secondary" onClick={onClickNextLesson}>
                Next <ArrowBigRightIcon />
              </Button>
            ) : module + 1 < course.data.modules.length ? (
              <Button asChild variant="secondary">
                <Link href={nextModuleHref}>
                  Next Module <ArrowBigRightIcon />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </>
      ) : (
        <div className="m-auto">
          <TypographyH1>No Module Found!</TypographyH1>
        </div>
      )}
    </div>
  );
}

function Lessons({ lesson, lessonId }) {
  switch (data.lessonTypes.findIndex((ele) => ele == lesson.type)) {
    case 1:
      return <LessonView1 lesson={lesson} lessonId={lessonId} />;

    default:
      return <LessonView0 lesson={lesson} lessonId={lessonId} />;
  }
}
