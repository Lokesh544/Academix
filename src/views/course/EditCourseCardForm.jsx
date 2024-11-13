"use client";

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
import getCourse from "@/lib/utils/course/getCourse";
import postUpdateCourse from "@/lib/utils/course/postUpdateCourse";
import { localdata } from "@/localdata";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string(),
  about: z.string().min(2),
  description: z.string().min(2),
  price: z.string().min(2),
  expectedTime: z.string(),
});

export default function EditCourseCardForm({ id }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      about: "",
      description: "",
      price: "",
      expectedTime: "",
    },
  });

  useEffect(() => {
    if (typeof window != "undefined") {
      (async () => {
        await getCourse(id, localdata.username(), localdata.password())
          .then((course) => {
            form.setValue("name", course.name);
            form.setValue("about", course.about);
            form.setValue("description", course.description);
            form.setValue("expectedTime", course.expectedTime);
            form.setValue("imageUrl", course.imageUrl);
            form.setValue("price", course.price);
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, []);

  async function onSubmit(values) {
    await postUpdateCourse({
      username: localdata.username(),
      userpassword: localdata.password(),
      courseId: id,
      name: values.name,
      imageUrl: values.imageUrl,
      about: values.about,
      description: values.description,
      price: values.price,
      expectedTime: values.expectedTime,
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
        <TypographyH1 className="text-center my-8">Create Course</TypographyH1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Name"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex">
                <div className="grow">
                  <FormLabel>Course Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Course Profile Image - https link"
                      className="border-2 bg-[#0003]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
                <div className="ml-4">
                  {field.value != "" && (
                    <img
                      src={praseHttps(field.value)}
                      className="rounded max-w-80"
                    />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About the Course</FormLabel>
                <FormControl>
                  <Input
                    placeholder="About Course"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Course Description"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Price"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expectedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expected Time"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" asChild>
              <Link href="..">Go to Course</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
