import CourseCard from "@/components/basic/CourseCard";
import { TypographyH1 } from "@/components/ui/typography";
import CardRender from "@/components/utils/CardRender";
import SearchBar from "@/components/utils/SearchBar";

const courses = [
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
    <div>
      <TypographyH1 className="capitalize text-center my-8">
        courses
      </TypographyH1>
      <SearchBar />
      <CardRender data={courses} ItemRender={CourseCard} className="my-16" />
    </div>
  );
}
