"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TypographyH4, TypographyP } from "../ui/typography";
import {
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuSquareIcon,
} from "lucide-react";

export default function CourseModuleListItem({
  className,
  name,
  description,
  hours,
  lessons,
  id,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible onOpenChange={setIsOpen} {...props}>
      <CollapsibleTrigger className="flex justify-between items-center p-2 w-full hover:bg-secondary-200/30 rounded group">
        <div>
          <TypographyH4 className="text-left">{name}</TypographyH4>
          <div className="flex items-center text-xs">
            <p>Module {id + 1}</p>
            <div className="rounded-full w-1 h-1 bg-black mx-2" />
            <p>{hours} hours to complete</p>
          </div>
        </div>
        <div className="flex items-center">
          <TypographyP className={isOpen ? "" : "group-hover:block hidden"}>
            More Details
          </TypographyP>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 space-y-4">
        <TypographyP>{description}</TypographyP>
        <TypographyH4 className="text-lg">What's included</TypographyH4>
        <LessonsIncluded lessons={lessons} />
      </CollapsibleContent>
    </Collapsible>
  );
}

function LessonsIncluded({ lessons }) {
  const compiledLesson = {
    reading: {
      Icon: BookOpenIcon,
      text: (n) => `${n} ${n > 1 ? "readings" : "reading"}`,
      count: 0,
    },
    quiz: {
      Icon: MenuSquareIcon,
      text: (n) => `${n} ${n > 1 ? "quizzes" : "quiz"}`,
      count: 0,
    },
  };

  for (let lesson of lessons) {
    switch (lesson?.type) {
      case "reading":
        compiledLesson.reading.count += 1;
        break;

      case "quiz":
        compiledLesson.quiz.count += 1;
        break;
    }
  }

  const items = [];
  for (let item in compiledLesson) {
    if (compiledLesson[item].count <= 0) continue;
    const Icon = compiledLesson[item].Icon;
    items.push(
      <div key={item} className="flex items-center gap-2">
        <Icon />
        <p>{compiledLesson[item].text(compiledLesson[item].count)}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6">{items.length > 0 ? items : "Nothing"}</div>
  );
}
