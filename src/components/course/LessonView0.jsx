import { TypographyH1, TypographyH3, TypographyP } from "../ui/typography";

export default function LessonView0({
  lesson: { name = "", minutes = 0, data = "[]" },
  lessonId,
}) {
  data = JSON.parse(data);

  return (
    <div className="space-y-8 mb-8">
      <div className="flex items-center">
        <TypographyH1 className="grow">{name}</TypographyH1>
        <TypographyP className="m-[0_!important] text-sm">
          {minutes} Minutes
        </TypographyP>
      </div>
      <div>
        {data.map((ele, id) => (
          <div key={id}>
            <TypographyH3>{ele.title}</TypographyH3>
            <TypographyP>
              {ele.content.split("\n").flatMap((ele, i, arr) => {
                if (arr.length - 1 != i) return [ele, <br />];
                else return ele;
              })}
            </TypographyP>
            {id + 1 != data.length && (
              <div className="border border-border/30 mt-4 mb-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
