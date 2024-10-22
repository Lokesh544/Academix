"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StarIcon from "@/components/utils/StarIcon";
import UserAvatar from "@/components/utils/UserAvatar";
import Section from "@/components/wrappers/Section";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const testimonialData = [
  {
    testimonial: {
      name: "Ebou Jobe",
      about: "Developer",
      img: "https://github.com/shadcn.png",
      role: 1,
    },
    stars: 3,
  },
  {
    testimonial: {
      name: "Ebou Jobe",
      about: "Developer",
      img: "https://github.com/shadcn.png",
      role: 1,
    },
    stars: 3,
  },
  {
    testimonial: {
      name: "Ebou Jobe",
      about: "Developer",
      img: "https://github.com/shadcn.png",
      role: 1,
    },
    stars: 3,
  },
];

export default function Testimonials() {
  const plugin = React.useRef(Autoplay({ stopOnInteraction: true }));

  return (
    <Section>
      <h2 className="text-6xl font-bold text-center my-10">Testimonials</h2>
      <div className="w-2/3 mx-auto">
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonialData.map((ele, id) => (
              <CarouselItem key={id}>
                <TestimonialCard
                  testimonial={ele.testimonial}
                  stars={ele.stars}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-background-200/80" />
          <CarouselNext className="bg-background-200/80" />
        </Carousel>
      </div>
    </Section>
  );
}

export function TestimonialCard({ testimonial, msg, stars }) {
  return (
    <Card className="gap-8 bg-background-200 px-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <UserAvatar user={testimonial} />
            <div>
              <p className="text-lg font-medium">{testimonial.name}</p>
              {testimonial.about && (
                <p className="text-sm text-muted-foreground">
                  {testimonial.about}
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            {[...Array(Math.min(Math.max(stars, 0), 5))]
              .splice(0, 5)
              .map((_, id) => (
                <StarIcon key={id} glow />
              ))}
            {[...Array(Math.max(5 - stars, 0))].map((_, id) => (
              <StarIcon key={id} />
            ))}
          </div>
        </div>
      </CardHeader>
      <hr className="bg-white h-0.5" />
      <CardContent className="pt-10 text-justify">
        {msg ||
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.`}
      </CardContent>
    </Card>
  );
}
