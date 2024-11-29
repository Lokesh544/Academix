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
import getCourse from "@/lib/utils/course/getCourse";
import postCreateCourse from "@/lib/utils/course/postCreateCourse";
import postUpdateCourse from "@/lib/utils/course/postUpdateCourse";
import { localdata } from "@/localdata";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const courseFormSchema = z.object({
  titleImg: z.string(),
  modules: z.array(courseModuleFormSchema),
});

export default function EditCourseForm({ id }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      titleImg: "",
      modules: [],
    },
  });

  useEffect(() => {
    if (typeof window != "undefined") {
      (async () => {
        await getCourse(id, localdata.username(), localdata.password())
          .then((course) => {
            const data = JSON.parse(course.data);
            form.setValue("modules", data.modules);
            form.setValue("titleImg", data.titleImg);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, []);

  async function onSubmit(values) {
    const data = JSON.stringify(values);
    await postUpdateCourse({
      username: localdata.username(),
      userpassword: localdata.password(),
      courseId: id,
      data: data,
    })
      .then((success) => {
        toast({
          description: `Course Updated Successfully 🎉`,
        });
        setTimeout(() => {
          window.location.href = `/course/${id}`;
        }, 2000);
      })
      .catch((err) => {
        toast({
          description: err.message,
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
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" asChild>
              <Link href=".">Go to Course</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
