"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import LoginDialog from "../profile/LoginDialog";
import { useEffect, useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logout, { logout } from "../profile/logout";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { data } from "@/data";
import { TypographyH4, TypographyP } from "../ui/typography";
import ProfileEditDialogForm from "../profile/ProfileEditDialogForm";
import { localdata } from "@/localdata";
import getUser from "@/lib/utils/user/getUser";

const links = [
  { label: "home", link: "/" },
  { label: "Dashboard", link: "/" },
  { label: "Courses", link: "/courses" },
  { label: "Blog", link: "/" },
  { label: "Contact", link: "/" },
];

const profileLinks = [
  { label: "create course", link: "/create/course", role: 1 },
];

export default function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof window != "undefined") {
      if (localdata.username() && localdata.password()) {
        getUser(localdata.username(), localdata.password())
          .then((user) => {
            setUser(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  return (
    <>
      <nav className="fixed z-20 h-20 bg-background w-full top-0 left-0 p-2">
        <div className="h-full px-5 border-b-2 border-b-primary">
          <div className="h-full max-w-screen-xl mx-auto flex justify-between items-center">
            <img
              src="/logo.svg"
              alt="Logo"
              className="rounded-full text-primary my-2 border h-2/3"
            />
            <div className="hidden md:flex gap-x-4">
              {links.map((ele, id) => (
                <Button
                  asChild
                  variant={"link"}
                  key={id}
                  className="capitalize"
                >
                  <Link href={ele.link}>{ele.label}</Link>
                </Button>
              ))}
            </div>
            {user ? (
              <Drawer>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <UserAvatar user={user} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {links.map((ele, id) => (
                      <DropdownMenuItem
                        key={id}
                        asChild
                        className="capitalize md:hidden"
                      >
                        <Link href={ele.link}>{ele.label}</Link>
                      </DropdownMenuItem>
                    ))}
                    {profileLinks.map(
                      (ele, id) =>
                        ele.role <= user.role && (
                          <DropdownMenuItem
                            key={id}
                            asChild
                            className="capitalize"
                          >
                            <Link href={ele.link}>{ele.label}</Link>
                          </DropdownMenuItem>
                        )
                    )}
                    <DropdownMenuItem asChild>
                      <DrawerTrigger className="w-full">Profile</DrawerTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <Logout />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="hidden">Profile</DrawerTitle>
                    <DrawerDescription asChild>
                      <div className="flex flex-col md:flex-row justify-center text-primary gap-8">
                        <div className="w-full md:w-4/5 flex justify-center text-primary gap-8">
                          <UserAvatar
                            className="w-20 md:w-40 h-20 md:h-40"
                            fallbackClassName="text-3xl"
                            user={user}
                          />
                          <div className="w-3/5 flex flex-col justify-center">
                            <TypographyH4>{user.name}</TypographyH4>
                            <TypographyP>
                              {user.about}
                              <br />
                              Role: {data.userRoles[parseInt(user.role)]}
                            </TypographyP>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <ProfileEditDialogForm
                            user={user}
                            setUser={setUser}
                          />
                        </div>
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild className="w-fit px-8 self-center">
                      <Button variant="secondary">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ) : (
              <LoginDialog
                trigger={
                  <Button className="text-secondary-foreground font-bold">
                    Login
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </nav>
      <div className="h-20" />
    </>
  );
}
