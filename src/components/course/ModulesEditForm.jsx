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
import { TypographyH2 } from "../ui/typography";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import LessonsEditForm, {
  courseModuleLessonFormSchema,
} from "./LessonsEditForm";

export const courseModuleFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  lessons: z.array(courseModuleLessonFormSchema),
  hours: z.number(),
});

export default function ModulesEditForm({ field, toast }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const modules = [];
  const moduleMap = {};
  for (let module in field.value) {
    modules.push({
      value: field.value[module].name,
      label: field.value[module].name,
    });
    moduleMap[field.value[module].name] = module;
  }

  if (value != "" && !(value in moduleMap)) setValue("");

  return (
    <FormItem>
      <FormLabel>Course Modules</FormLabel>
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
                  ? modules.find((module) => module.value === value)?.label
                  : "Select Module..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search Module..." />
                <CommandList>
                  <CommandEmpty>No Module found.</CommandEmpty>
                  <CommandGroup>
                    {modules.map((module) => (
                      <CommandItem
                        key={module.value}
                        value={module.value}
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
                            value === module.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {module.label}
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
              const data = field.value;
              data.push({
                name: `Module ${data.length + 1}`,
                description: "",
                lessons: [],
                hours: 0,
              });
              field.onChange(data);
              toast({
                description: `Module Add`,
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
              let data = field.value;
              data = data.filter((ele, i) => i != moduleMap[value]);
              field.onChange(data);
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
            <ModuleEditForm
              field={field}
              value={moduleMap[value]}
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

function ModuleEditForm({ field, value: id, close, toast }) {
  const form = useForm({
    resolver: zodResolver(courseModuleFormSchema),
    defaultValues: {
      name: field.value[id]?.name || "",
      description: field.value[id]?.description || "",
      lessons: field.value[id]?.lessons || [],
      hours: field.value[id]?.hours || 0,
    },
  });

  async function onSubmit(values) {
    const data = field.value;
    data[id] = values;
    field.onChange(data);
    toast({
      description: `Module Updated`,
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
          render={({ field: module_field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <TypographyH2 className="grow">
                    {module_field.value}
                  </TypographyH2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Module Name</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="module_name" className="text-right">
                            Module Name
                          </Label>
                          <Input
                            id="module_name"
                            placeholder="Module Name"
                            defaultValue={module_field.value}
                            className="col-span-3 bg-black/20 focus:bg-black/30"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              module_field.onChange(
                                document.getElementById("module_name").value
                              );
                            }}
                            variant="secondary"
                            type="submit"
                          >
                            Save changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field: module_field }) => (
            <FormItem>
              <FormLabel>Module Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Module Description"
                  className="border-2 bg-[#0003]"
                  {...module_field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field: module_field }) => (
            <FormItem>
              <FormLabel>Hours to Complete Module</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hours to Complete Module"
                  className="border-2 bg-[#0003]"
                  type="number"
                  min={0}
                  {...module_field}
                  onChange={(event) => {
                    let data = parseInt(event.target.value || 0);
                    module_field.onChange(data);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lessons"
          render={(props) => <LessonsEditForm toast={toast} {...props} />}
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
          Update Module
        </Button>
      </div>
    </Form>
  );
}
