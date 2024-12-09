"use client";

import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { localdata } from "@/localdata";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    if (localdata.username() && localdata.password()) router.push("/");
  });

  return (
    <>
      <NavBar />
      <main className="xl:max-w-screen-xl h-screen mx-auto px-4 md:px-10">
        <div className="h-4/6 flex flex-col justify-center items-center gap-8">
          <TypographyH1>Please Login to Continue</TypographyH1>
          <Button variant="secondary" className="font-bold" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
