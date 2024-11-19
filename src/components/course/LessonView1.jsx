"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { TypographyH1, TypographyH3, TypographyP } from "../ui/typography";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

export default function LessonView1({
  lesson: { name = "", minutes = 0, data = "[]" },
  lessonId,
}) {
  const [submit, setSubmit] = useState(false);
  data = JSON.parse(data ? data : "[]");
  console.log("Data", data);

  return (
    <div className="space-y-8 mb-8">
      <div className="flex items-center">
        <TypographyH1 className="grow">{name}</TypographyH1>
        <TypographyP className="m-[0_!important] text-sm">
          {minutes} Minutes
        </TypographyP>
      </div>
      <div>
        {data.length == 0 && <TypographyH3>No Question Found!</TypographyH3>}
        {data.map((q, questionId) => (
          <div key={questionId}>
            <TypographyH3>{q.question}</TypographyH3>
            <RadioGroup className="my-4 space-y-2">
              {q.options.map((option, optionId) => (
                <div
                  className={cn(
                    "flex items-center gap-x-2 rounded p-1 border-secondary-200",
                    submit && optionId == q.right && "border-2"
                  )}
                >
                  <RadioGroupItem
                    value={option}
                    id={`${lessonId}_${questionId}_${optionId}`}
                  />
                  <Label htmlFor={`${lessonId}_${questionId}_${optionId}`}>
                    {option}
                  </Label>
                  {submit && optionId == q.right && (
                    <div className="ml-auto">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
            {questionId + 1 != data.length && (
              <>
                <div className="border border-border/30 mt-4 mb-6" />
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <Button
          variant="secondary"
          className="m-auto block"
          onClick={() => {
            setSubmit((ele) => !ele);
          }}
        >
          {submit ? "Hide Answers" : "Show Answers"}
        </Button>
      </div>
    </div>
  );
}
