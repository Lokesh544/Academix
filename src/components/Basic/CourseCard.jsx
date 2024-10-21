import Image from "next/image";
import { Card } from "../ui/card";
import { PlayIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import UserAvatar from "../utils/UserAvatar";
import StarIcon from "../utils/StarIcon";
import { Button } from "../ui/button";
import CourseImg from "@/assets/course-image.png";
import Link from "next/link";

/**
 *
 * @param {{className?: string | object, instructor: {name: string, about: string, img: string | URL, role: number}, id: string, stars: number, students: number}} props
 * @returns
 */
export default function CourseCard({
  className,
  instructor,
  id,
  stars,
  students,
  ...props
}) {
  return (
    <Card
      className="bg-background-200 rounded-2xl border-2 w-80 h-[30rem] hover:scale-105 transition-transform"
      {...props}
    >
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
            <UserAvatar user={instructor} fallbackClassName="bg-transparent" />
            <div>
              <p className="font-medium leading-none">{instructor.name}</p>
              <p className="text-xs text-muted-foreground">
                {instructor.about}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-center">{students}+</p>
            <p className="text-sm text-center">Students</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(Math.min(Math.max(stars, 0), 5))]
              .splice(0, 5)
              .map((_, id) => (
                <StarIcon key={id} glow />
              ))}
            {[...Array(Math.max(5 - stars, 0))].map((_, id) => (
              <StarIcon key={id} />
            ))}
          </div>
          <Button
            asChild
            className="bg-secondary-200 hover:bg-secondary-200/80"
          >
            <Link href={`/course/${id}/`}>Enroll Now</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
