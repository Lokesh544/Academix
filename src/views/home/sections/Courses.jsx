import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Section from "@/components/Wrappers/Section";
import Image from "next/image";
import CourseImg from "@/assets/course-image.png";
import { PlayIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StarIcon from "@/components/utils/StarIcon";
import UserAvatar from "@/components/utils/UserAvatar";
import Link from "next/link";

const CourseData = [
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      img: "https://github.com/shadcn.png",
      role: 1,
    },
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    stars: 3,
    students: 100,
  },
];

export default function Courses() {
  return (
    <Section>
      <h3 className="text-5xl font-bold inline-block">
        Popular
        <span className="text-secondary ml-4">Courses</span>
      </h3>
      <div className="flex justify-around flex-wrap gap-x-4 gap-y-6 my-8">
        {CourseData.map((ele, id) => (
          <CourseCard key={id} course={ele} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button asChild className="bg-secondary hover:bg-secondary/90">
          <Link href="/">Explore All Courses</Link>
        </Button>
      </div>
    </Section>
  );
}

function CourseCard({ course }) {
  return (
    <Card className="bg-background-200 rounded-2xl border-2 w-80 h-[30rem] hover:scale-105 transition-transform">
      <Image src={CourseImg} alt="Course" />
      <div className="m-4 flex flex-col gap-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="rounded-full grid place-items-center bg-secondary-200 p-1">
              <PlayIcon size={24} />
            </div>
            10x Lectures
          </div>
          <Badge variant={"secondary"} className="text-secondary-foreground">
            Default
          </Badge>
        </div>
        <div className="font-bold tracking-widest text-sm">React Static</div>
        <div className="flex items-center justify-between py-4 border-y-2 border-y-primary-foreground">
          <div className="flex items-center gap-1">
            <UserAvatar
              user={course.instructor}
              fallbackClassName="bg-transparent"
            />
            <div>
              <p className="font-medium leading-none">
                {course.instructor.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {course.instructor.about}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-center">{course.students}+</p>
            <p className="text-sm text-center">Students</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(Math.min(Math.max(course.stars, 0), 5))]
              .splice(0, 5)
              .map((_, id) => (
                <StarIcon key={id} glow />
              ))}
            {[...Array(Math.max(5 - course.stars, 0))].map((_, id) => (
              <StarIcon key={id} />
            ))}
          </div>
          <Button className="bg-secondary-200 hover:bg-secondary-200/80">
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
