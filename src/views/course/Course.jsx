import CourseModuleListItem from "@/components/Basic/CourseModuleListItem";
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
import Image from "next/image";
import Link from "next/link";

export default async function Course({ id }) {
  const course = {
    about:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, fugiat.",
    data: '{"titleImg": "", "modules": []}',
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima quibusdam sequi incidunt, magni accusantium dolorem esse impedit illum veritatis in iure repellendus est fugiat adipisci maxime modi assumenda eum facilis nihil quisquam? Perspiciatis quidem porro dignissimos nulla, at sapiente, ratione eveniet id voluptates nobis iure architecto eligendi quisquam ducimus beatae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima quibusdam sequi incidunt, magni accusantium dolorem esse impedit illum veritatis in iure repellendus est fugiat adipisci maxime modi assumenda eum facilis nihil quisquam? Perspiciatis quidem porro dignissimos nulla, at sapiente, ratione eveniet id voluptates nobis iure architecto eligendi quisquam ducimus beatae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima quibusdam sequi incidunt, magni accusantium dolorem esse impedit illum veritatis in iure repellendus est fugiat adipisci maxime modi assumenda eum facilis nihil quisquam? Perspiciatis quidem porro dignissimos nulla, at sapiente, ratione eveniet id voluptates nobis iure architecto eligendi quisquam ducimus beatae.",
    expectedTime: "awdawd",
    imageUrl: "awdawd",
    name: "Course",
    price: "awfdawf",
    rating: 1,
    userId: "66d6c0984817eb1a932ba90f",
    _id: "6715d4817f229c84da1ef2e5",
  };
  course.data = JSON.stringify({
    modules: [
      {
        name: "Put your Certificate to work",
        description:
          "Earning your Google Data Analytics Certificate is a badge of honor. It's also a real badge. In this part of the course, you'll learn how to claim your certificate badge and display it in your LinkedIn profile. You'll also be introduced to job search benefits that you can claim as a certificate holder, including access to the Big Interview platform and Byteboard interviews.",
        lessons: [
          { type: "reading" },
          { type: "reading" },
          { type: "reading" },
          { type: "reading" },
          { type: "reading" },
          { type: "quiz" },
          { type: "quiz" },
          { type: "quiz" },
        ],
        hours: 4,
      },
      {
        name: "Put your Certificate to work",
        description:
          "Earning your Google Data Analytics Certificate is a badge of honor. It's also a real badge. In this part of the course, you'll learn how to claim your certificate badge and display it in your LinkedIn profile. You'll also be introduced to job search benefits that you can claim as a certificate holder, including access to the Big Interview platform and Byteboard interviews.",
        lessons: [{}],
        hours: 4,
      },
      {
        name: "Put your Certificate to work",
        description:
          "Earning your Google Data Analytics Certificate is a badge of honor. It's also a real badge. In this part of the course, you'll learn how to claim your certificate badge and display it in your LinkedIn profile. You'll also be introduced to job search benefits that you can claim as a certificate holder, including access to the Big Interview platform and Byteboard interviews.",
        lessons: [{}],
        hours: 4,
      },
    ],
  });
  course.data = await JSON.parse(course.data);
  course.students = 1230487;
  course.instructor = {
    name: "Ebou Jobe",
    about: "Developer",
    img: "https://github.com/shadcn.png",
    role: 1,
  };
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
