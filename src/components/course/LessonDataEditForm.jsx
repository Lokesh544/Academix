"use client";

import { FormItem, FormLabel } from "../ui/form";
import { data } from "@/data";
import { LessonDataEditForm1 } from "./LessonDataEditForm1";
import { LessonDataEditForm0 } from "./LessonDataEditForm0";

export default function LessonDataEditForm({ lessonType, field, toast }) {
  return (
    <FormItem>
      <FormLabel>Lesson Content</FormLabel>
      <div className="py-4 space-y-2">
        {(() => {
          switch (data.lessonTypes.findIndex((ele) => ele == lessonType)) {
            case 1:
              return <LessonDataEditForm1 field={field} toast={toast} />;

            default:
              return <LessonDataEditForm0 field={field} toast={toast} />;
          }
        })()}
      </div>
    </FormItem>
  );
}
