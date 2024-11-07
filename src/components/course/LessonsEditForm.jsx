"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { data } from "@/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import LessonDataEditForm from "./LessonDataEditForm";

export const courseModuleLessonFormSchema = z.object({
  name: z.string(),
  type: z.string(),
  minutes: z.number(),
  data: z.string(),
});

export default function LessonsEditForm({ field, toast }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const lessons = [];
  const lessonMap = {};
  for (let lesson in field.value) {
    lessons.push({
      value: field.value[lesson].name,
      label: field.value[lesson].name,
    });
    lessonMap[field.value[lesson].name] = lesson;
  }
  if (value != "" && !(value in lessonMap)) setValue("");

  return (
    <FormItem>
      <FormLabel>Module Lessons</FormLabel>
      <FormControl>
        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-black/20 hover:bg-black/30"
              >
                {value
                  ? lessons.find((lesson) => lesson.value === value)?.label
                  : "Select Lesson..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search Lesson..." />
                <CommandList>
                  <CommandEmpty>No Lesson found.</CommandEmpty>
                  <CommandGroup>
                    {lessons.map((lesson) => (
                      <CommandItem
                        key={lesson.value}
                        value={lesson.value}
                        onSelect={(currentValue) => {
                          if (currentValue === value) {
                            setValue("");
                          } else {
                            setValue("");
                            setTimeout(() => {
                              setValue(currentValue);
                            }, 0);
                          }
                          setOpen(false);
                        }}
                        className="capitalize"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === lesson.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {lesson.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            variant="secondary"
            onClick={(event) => {
              event.preventDefault();
              const list = field.value;
              list.push({
                name: `Lesson ${list.length + 1}`,
                type: data.lessonTypes[0],
                minutes: 0,
                data: "",
              });
              field.onChange(list);
              toast({
                description: `Lesson Add`,
                duration: 1000,
              });
            }}
          >
            Add
          </Button>
          <Button
            variant="destructive"
            disabled={value == ""}
            onClick={(event) => {
              event.preventDefault();
              let list = field.value;
              list = list.filter((ele, i) => i != lessonMap[value]);
              field.onChange(list);
            }}
          >
            Delete
          </Button>
        </div>
      </FormControl>
      <FormMessage />
      <div className="py-4 space-y-2">
        {value != "" ? (
          <>
            <div className="border-2 border-border/80" />
            <LessonEditForm
              field={field}
              value={lessonMap[value]}
              close={() => setValue("")}
              toast={toast}
            />
            <div className="border-2 border-border/80" />
          </>
        ) : (
          <>
            <div className="border border-border/60" />
            <div className="border border-border/60" />
          </>
        )}
      </div>
    </FormItem>
  );
}

function LessonEditForm({ field, value: id, close, toast }) {
  const form = useForm({
    resolver: zodResolver(courseModuleLessonFormSchema),
    defaultValues: {
      name: field.value[id].name,
      type: field.value[id].type,
      minutes: field.value[id].minutes,
      data: field.value[id].data,
    },
  });

  async function onSubmit(values) {
    const data = field.value;
    data[id] = values;
    field.onChange(data);
    toast({
      description: `Lesson Updated`,
      duration: 1000,
    });
    close();
  }

  return (
    <Form {...form}>
      <div className="space-y-8 py-6 mx-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lesson Name"
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(event) => {
                    form.setValue("data", "");
                    field.onChange(event);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-2 bg-[#0003] capitalize">
                    <SelectValue placeholder="Lesson Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.lessonTypes.map((ele, id) => (
                      <SelectItem key={id} value={ele} className="capitalize">
                        {ele}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minutes to Complete Lesson</FormLabel>
              <FormControl>
                <Input
                  placeholder="Minutes to Complete Lesson"
                  className="border-2 bg-[#0003]"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(event) => {
                    let data = parseInt(event.target.value || 0);
                    field.onChange(data);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={(props) => (
            <LessonDataEditForm
              lessonType={form.getValues().type}
              toast={toast}
              {...props}
            />
          )}
        />
        <Button
          onClick={async (event) => {
            event.preventDefault();
            const submit = form.handleSubmit(onSubmit);
            submit(event);
          }}
          variant="secondary"
          type="submit"
          className="block mx-auto"
        >
          Update Lesson
        </Button>
      </div>
    </Form>
  );
}
