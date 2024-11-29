"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const courseModuleLessonData0FormSchema = z.object({
  sections: z.array(z.object({ title: z.string(), content: z.string() })),
});

export function LessonDataEditForm0({ field, toast }) {
  const form = useForm({
    resolver: zodResolver(courseModuleLessonData0FormSchema),
    defaultValues: {
      sections: JSON.parse(field.value || "[]"),
    },
  });

  async function onSubmit(values) {
    const data = JSON.stringify(values.sections);
    field.onChange(data);
  }

  async function onDeleteSection(index) {
    let data = form.getValues().sections;
    data = data.filter((ele, i) => i != index);
    form.setValue("sections", []);
    setTimeout(() => {
      form.setValue("sections", data);
    }, 1);
  }

  const InputComponent = ({ field, value: id, deleteSection }) => {
    const FormSchema = z.object({ title: z.string(), content: z.string() });

    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        title: field.value[id].title,
        content: field.value[id].content,
      },
    });

    async function onSubmit(values) {
      const data = field.value;
      data[id] = values;
      field.onChange(data);
    }

    return (
      <Form {...form}>
        <div
          className="space-y-2 px-2 py-4 rounded bg-[#0001] border border-[#0001]"
          onBlur={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Title"
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Content"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end gap-2">
            <Button
              onClick={async (event) => {
                event.preventDefault();
                deleteSection(id);
              }}
              variant="secondary"
              type="submit"
            >
              Delete
            </Button>
          </div>
        </div>
      </Form>
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="sections"
          render={({ field }) => (
            <>
              {field.value == null ? (
                <div>Add new Section to Continue!!</div>
              ) : field.value.length <= 0 ? (
                <div>Add new Section to Continue!!</div>
              ) : (
                field.value.map((ele, id) => (
                  <InputComponent
                    key={id}
                    value={id}
                    field={field}
                    deleteSection={onDeleteSection}
                  />
                ))
              )}
              <FormMessage />
              <div className="w-full flex flex-col md:flex-row justify-end gap-2">
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    const data = [...field.value, { title: "", content: "" }];
                    field.onChange(data);
                  }}
                  variant="secondary"
                  type="submit"
                >
                  Add Section
                </Button>
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    form.handleSubmit(onSubmit)(event);
                    toast({
                      description: `Section Updated`,
                      duration: 1000,
                    });
                  }}
                  variant="secondary"
                  type="submit"
                >
                  Update Section
                </Button>
              </div>
            </>
          )}
        />
      </div>
    </Form>
  );
}
