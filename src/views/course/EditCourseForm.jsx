"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  titleImg: z.string(),
  modules: z.array(),
});

export default function EditCourseForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleImg: "",
      modules: [],
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
          <Button variant="secondary" type="submit" className="block mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
