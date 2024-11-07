"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const courseModuleLessonData1FormSchema = z.object({
  sections: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      right: z.string(),
    })
  ),
});

export function LessonDataEditForm1({ field, toast }) {
  const form = useForm({
    resolver: zodResolver(courseModuleLessonData1FormSchema),
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
    const FormSchema = z.object({
      question: z.string(),
      options: z.array(z.string()),
      right: z.string(),
    });

    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        question: field.value[id].question,
        options: field.value[id].options,
        right: field.value[id].right,
      },
    });

    const [editable, setEditable] = useState(
      field.value[id].right == "" ? true : false
    );

    async function onSubmit(values) {
      const data = field.value;
      data[id] = values;
      field.onChange(data);
    }

    const selectItems = [];
    for (let i = 0; i < 9; i++) {
      selectItems.push(
        <SelectItem key={i} value={i} className="capitalize">
          {i + 1}
        </SelectItem>
      );
    }

    return (
      <Form {...form}>
        <div className="space-y-2 px-2 py-4 rounded bg-[#0001] border border-[#0001]">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={!editable}
                    placeholder="Question"
                    className="border-2 bg-[#0003]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border" />
          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem>
                {field.value.map((ele, id) => (
                  <Input
                    key={id}
                    disabled={!editable}
                    placeholder="Option"
                    className="border-2 bg-[#0003]"
                    defaultValue={ele}
                    onChange={(event) => {
                      const data = field.value;
                      data[id] = event.target.value;
                      field.onChange(data);
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border" />
          <FormField
            control={form.control}
            name="right"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!editable}
                  >
                    <SelectTrigger className="border-2 bg-[#0003] capitalize">
                      <SelectValue placeholder="Correct Option" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(form.getValues().options.length)].map(
                        (ele, id) => (
                          <SelectItem
                            key={id}
                            value={id.toString()}
                            className="capitalize"
                          >
                            {id + 1}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end gap-2">
            {editable ? (
              <>
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    const data = [...form.getValues().options, ""];
                    form.setValue("options", data);
                    form.handleSubmit(onSubmit)(event);
                  }}
                  variant="secondary"
                  type="submit"
                >
                  Add Option
                </Button>
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    form.handleSubmit(onSubmit)(event);
                    setEditable(false);
                  }}
                  variant="secondary"
                  type="submit"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    setEditable(true);
                  }}
                  variant="secondary"
                  type="submit"
                >
                  Edit
                </Button>
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
              </>
            )}
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
              <div className="w-full flex justify-end gap-2">
                <Button
                  onClick={async (event) => {
                    event.preventDefault();
                    const data = [
                      ...field.value,
                      { question: "", options: [], right: "" },
                    ];
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
