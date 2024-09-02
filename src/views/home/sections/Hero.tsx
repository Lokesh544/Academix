import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Section from "@/components/Wrappers/Section";
import { cn } from "@/lib/utils";
import Image from "next/image";

import HeroImage from "@/assets/Fourth-Image.webp";
import SearchBar from "@/components/utils/SearchBar";

export default function Hero() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="flex justify-between items-center flex-col gap-y-16">
          <div className="text-3xl lg:text-5xl leading-normal">
            <h3 className="font-bold">
              <span className="text-secondary">
                Master Frontend & Backend Development:{" "}
              </span>
              Comprehensive Courses to Elevate Your Skills
            </h3>
          </div>
          <div className="lg:text-lg leading-loose">
            Explore backend development across diverse frameworks: Express,
            Spring Boot, and Fast API. Experience firsthand how each stack
            shapes the application's architecture and performance. Join us and
            broaden your development horizons.
          </div>
          <SearchBar className="w-11/12 lg:w-10/12" />
        </div>
        <Image
          src={HeroImage}
          height={812}
          width={609}
          alt="Hero image"
          className="hidden md:flex"
        />
      </div>
    </Section>
  );
}
