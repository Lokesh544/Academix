import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import postUpdateUser from "@/lib/utils/user/postUpdateUser";
import { localdata } from "@/localdata";

const formSchema = z.object({
  name: z.string(),
  about: z.string(),
  img: z.string(),
});

export default function ProfileEditDialogForm({ user, setUser }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      about: user.about,
      img: user.img,
    },
  });

  function onSubmit(values) {
    postUpdateUser(
      localdata.username(),
      localdata.password(),
      values.name,
      values.about,
      values.img
    )
      .then((user) => {
        setUser(user);
        setDialogOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-primary">
          <DialogTitle className="hidden">Edit Profile</DialogTitle>
          <DialogDescription className="hidden">
            Edit Profile Form
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Profile Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Img</FormLabel>
                    <FormControl>
                      <Input placeholder="Img (https Link)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Input placeholder="About You!" {...field} />
                    </FormControl>
                    <FormDescription>
                      About section for your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
