"use client";

import ModulesEditForm, {
  courseModuleFormSchema,
} from "@/components/course/ModulesEditForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH1 } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { praseHttps } from "@/lib/utils";
import postCreateCourse from "@/lib/utils/course/postCreateCourse";
import { localdata } from "@/localdata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const courseFormSchema = z.object({
  titleImg: z.string(),
  modules: z.array(courseModuleFormSchema),
});

export default function EditCourseForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      titleImg: "",
      modules: [
        {
          name: "Put your Certificate to work 1",
          description:
            "Earning your Google Data Analytics Certificate is a badge of honor. It's also a real badge. In this part of the course, you'll learn how to claim your certificate badge and display it in your LinkedIn profile. You'll also be introduced to job search benefits that you can claim as a certificate holder, including access to the Big Interview platform and Byteboard interviews.",
          lessons: [
            { type: "reading", name: "Lesson 1", minutes: 5, data: "" },
            { type: "reading", name: "Lesson 2", minutes: 5, data: "" },
            { type: "reading", name: "Lesson 3", minutes: 5, data: "" },
            { type: "reading", name: "Lesson 4", minutes: 5, data: "" },
            { type: "reading", name: "Lesson 5", minutes: 5, data: "" },
            { type: "quiz", name: "Lesson 6", minutes: 5, data: "" },
            { type: "quiz", name: "Lesson 7", minutes: 5, data: "" },
            { type: "quiz", name: "Lesson 8", minutes: 5, data: "" },
          ],
          hours: 4,
        },
        {
          name: "Put your Certificate to work 2",
          description:
            "Earning your Google Data Analytics Certificate is a badge of honor. It's also a real badge. In this part of the course, you'll learn how to claim your certificate badge and display it in your LinkedIn profile. You'll also be introduced to job search benefits that you can claim as a certificate holder, including access to the Big Interview platform and Byteboard interviews.",
          lessons: [],
          hours: 4,
        },
        {
          name: "Put your Certificate to work 3",
          description:
            "Earning your Google Data Analytics Certificate is a badge of honor. It's also a real badge. In this part of the course, you'll learn how to claim your certificate badge and display it in your LinkedIn profile. You'll also be introduced to job search benefits that you can claim as a certificate holder, including access to the Big Interview platform and Byteboard interviews.",
          lessons: [],
          hours: 4,
        },
      ],
    },
  });

  async function onSubmit(values) {
    console.log(values);
  }

  async function t_onSubmit(values) {
    await postCreateCourse(
      localdata.username(),
      localdata.password(),
      values.name,
      values.imageUrl,
      values.about,
      values.description,
      values.price,
      values.expectedTime
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.course) return res.course;
        else throw new Error(res.error);
      })
      .then((course) => {
        console.log(course);
        toast({
          description: `Course Created Successfully 🎉`,
        });
        setTimeout(() => {
          console.log("Yea");
          // [ ]
          // window.location.href = `/course/${course._id}`
        }, 2000);
      })
      .catch((err) => {
        toast({
          description: err,
        });
      });
  }

  return (
    <div>
      <div>
        <TypographyH1 className="text-center my-8">Edit Course</TypographyH1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-8">
          <FormField
            control={form.control}
            name="titleImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Profile Image - https link"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {field.value != "" && (
                  <img src={praseHttps(field.value)} className="rounded" />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modules"
            render={(props) => <ModulesEditForm toast={toast} {...props} />}
          />
          <Button variant="secondary" type="submit" className="block mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
