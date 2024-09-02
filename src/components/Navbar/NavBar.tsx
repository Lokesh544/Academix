"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import LoginDialog from "../Login/LoginDialog";
import { useEffect, useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import userInterface from "@/interfaces/userInterface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logout, { logout } from "../Login/logout";

const links = [
  { label: "home", link: "/" },
  { label: "Dashboard", link: "/" },
  { label: "Courses", link: "/" },
  { label: "Blog", link: "/" },
  { label: "Contact", link: "/" },
];

export default function NavBar() {
  const [user, setUser] = useState<userInterface>();

  useEffect(() => {
    if (typeof window != "undefined") {
      // TODO
      const user: userInterface = {
        name: "Ebou Jobe",
        about: "Developer",
        img: "https://github.com/shadcn.png",
        role: 1,
      };
      if (window.localStorage.getItem("username")) setUser(user);
      else setUser(undefined);
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
            <div className="flex gap-x-4">
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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserAvatar user={user} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={logout}>
                    <Logout />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
