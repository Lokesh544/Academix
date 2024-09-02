import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "@/components/Wrappers/Section";
import { GraduationCapIcon, User2Icon, VideoIcon } from "lucide-react";
import Image from "next/image";
import StatImage from "@/assets/MAIN-IMAGE.webp";
import { ReactNode } from "react";

const SELLING_POINTS = [
  {
    title: "Multi-Framework Mastery",
    body: "Unlike many courses that focus on just one backend framework, we dive deep into multiple ones. Build the same project using Express, Spring Boot, and FastAPI, and discover the nuances of each.",
  },
  {
    title: "Tailored Learning Path",
    body: "Recognizing that every learner is different, our content is structured to cater to both beginners and seasoned developers. Whether you're starting out or looking to refine existing skills, there's content tailored for you.",
  },
  {
    title: "Hands-On Approach",
    body: "Theory is essential, but practical application cements knowledge. Our courses are designed with a bias towards action. You won't just learn, you'll do.",
  },
  {
    title: "Thought Process Unveiled",
    body: "More than just coding, understanding the 'why' behind decisions can be pivotal. I walk you through my thought processes in detail, ensuring you grasp the deeper reasoning behind each line of code and architectural choice.",
  },
  {
    title: "Community & Support",
    body: "Engage with a community of passionate learners and experts. Get your queries addressed, share your projects, and grow together",
  },
];

const stats = [
  {
    icon: <VideoIcon />,
    statCount: 10000,
    title: "Videos",
  },
  {
    icon: <GraduationCapIcon />,
    statCount: 350000,
    title: "Students",
  },
  {
    icon: <User2Icon />,
    statCount: 125000,
    title: "Users",
  },
];

export default function Features() {
  return (
    <Section>
      <div className="flex justify-between">
        <div className="max-w-md">
          <p className="leading-relaxed text-2xl md:text-3xl lg:text-4xl font-bold">
            Unparalleled Course{" "}
            <span className="text-secondary">Distinction</span>
          </p>
          <Accordion type="single">
            {SELLING_POINTS.map((ele, id) => (
              <AccordionItem key={id} value={id.toString()}>
                <AccordionTrigger className="text-secondary text-lg font-bold">
                  {ele.title}
                </AccordionTrigger>
                <AccordionContent>{ele.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Image
          src={StatImage}
          height={757}
          width={478}
          alt="Stat Image"
          className="hidden lg:flex mx-4"
        />
        <div className="flex flex-col grow lg:grow-0 gap-10 p-5 items-center justify-center">
          {stats.map((ele, id) => (
            <Stat
              key={id}
              title={ele.title}
              icon={ele.icon}
              statCount={ele.statCount}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Stat({
  icon,
  statCount,
  title,
}: {
  icon: ReactNode;
  statCount: number;
  title: string;
}) {
  return (
    <div className="flex h-14 items-center space-x-4">
      <div className="w-14 h-full rounded-full grid place-content-center bg-[#7966EA]">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold leading-none">
          {statCount.toString()}+
        </p>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
}
