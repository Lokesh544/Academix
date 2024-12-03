import { Button } from "@/components/ui/button";
import Section from "@/components/wrappers/Section";

export default function JoinUs() {
  return (
    <Section>
      <div className="flex flex-col md:flex-row justify-center gap-10 items-center">
        <div className="w-9/12">
          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold leading-relaxed">
            <span className="text-secondary">
              {"Ready to supercharge your development journey? "}
            </span>
            Dive into our diverse courses, gain multi-framework expertise, and
            become a part of our thriving developer community. Your path to
            mastering frontend and backend development starts here.
          </h3>
        </div>
        <div className="flex md:flex-col flex-wrap gap-x-6 gap-y-10 grow">
          <Button className="rounded-lg text-primary bg-accent hover:bg-accent/90">
            Join as Instructor
          </Button>
          <Button className="rounded-lg bg-secondary-200 text-primary hover:bg-secondary-200/90">
            Join as Student
          </Button>
        </div>
      </div>
    </Section>
  );
}
