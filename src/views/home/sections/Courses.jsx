import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Section from "@/components/wrappers/Section";
import Image from "next/image";
import CourseImg from "@/assets/course-image.png";
import { PlayIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StarIcon from "@/components/utils/StarIcon";
import UserAvatar from "@/components/utils/UserAvatar";
import Link from "next/link";
import CardRender from "@/components/utils/CardRender";
import CourseCard from "@/components/basic/CourseCard";

const CourseData = [
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      img: "https://github.com/shadcn.png",
      role: 1,
    },
    id: 231234,
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    id: 231234,
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    id: 231234,
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    id: 231234,
    stars: 3,
    students: 100,
  },
  {
    instructor: {
      name: "Ebou Jobe",
      about: "Developer",
      role: 1,
    },
    id: 231234,
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
      <CardRender data={CourseData} ItemRender={CourseCard} />
      <div className="flex justify-center">
        <Button asChild className="bg-secondary hover:bg-secondary/90">
          <Link href="/courses">Explore All Courses</Link>
        </Button>
      </div>
    </Section>
  );
}
