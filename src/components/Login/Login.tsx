"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { userSchema } from "@/lib/db/models/User";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const [active, setActive] = useState(true);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!active) return;
    setActive(false);
    const res: { msg: string; user: userSchema } & { error: string } =
      await fetch(
        `/api/user/login?username=${values.username.toLowerCase()}&password=${
          values.password
        }`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
    if (!!res?.error) {
      toast({ title: res.error });
      setActive(true);
    } else {
      window.localStorage.setItem("username", res.user.username);
      window.localStorage.setItem("password", res.user.password);
      toast({ title: "Logged in Successfully" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setActive(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="text-primary">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" className="bg-muted" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="text-primary">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" className="bg-muted" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!active}
          type="submit"
          className="text-secondary-foreground"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
