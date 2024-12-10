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
import { parseHttps } from "@/lib/utils";
import postCreateCourse from "@/lib/utils/course/postCreateCourse";
import { localdata } from "@/localdata";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function CreateCourseForm() {
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

  async function onSubmit(values) {
    await postCreateCourse({
      username: localdata.username(),
      userpassword: localdata.password(),
      name: values.name,
      imageUrl: values.imageUrl,
      about: values.about,
      description: values.description,
      price: values.price,
      expectedTime: values.expectedTime,
    })
      .then((course) => {
        console.log(course);
        toast({
          description: `Course Created Successfully 🎉`,
        });
        setTimeout(() => {
          window.location.href = `/course/${course._id}`;
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
                      alt="Course Card Image"
                      src={parseHttps(field.value)}
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
          <Button variant="secondary" type="submit" className="block mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
