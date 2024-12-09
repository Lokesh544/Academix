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
      name: "Joe Jonas",
      about: "Student",
      img: "https://people.com/thmb/cQYm8cgmaZxiz-m0iHNWAj-0GuM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(765x0:767x2)/Joe-Jonas-071724-1-321cefcf33234976acfb7b91706c271d.jpg",
      role: 0,
    },
    msg: "Academix has completely transformed the way I prepare for my classes. The personalized study plans and interactive quizzes make learning enjoyable and effective. As an educator, I also appreciate the detailed analytics, which help me tailor my teaching methods to my students' needs.",
    stars: 4,
  },
  {
    testimonial: {
      name: "Michael Jackson",
      about: "Student",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzTOU3JnJHg3cCFHw7m4Glk2vtGu0xer4Wg&s",
      role: 0,
    },
    msg: "As a busy college student, I struggled to manage my lecture notes and assignments. Academix not only helps me stay organized but also offers real-time feedback on my performance. It's like having a personal tutor available 24/7!",
    stars: 5,
  },
  {
    testimonial: {
      name: "Kar Tr",
      about: "Instructor",
      img: "https://media.istockphoto.com/id/1329031407/photo/young-man-with-backpack-taking-selfie-portrait-on-a-mountain-smiling-happy-guy-enjoying.jpg?s=612x612&w=0&k=20&c=WvjAEx3QlWoAn49drp0N1vmxAgGObxWDpoXtaU2iB4Q=",
      role: 1,
    },
    msg: "Academix's innovative features help students connect theoretical concepts with real-world applications. The platform's focus on interactive learning fosters curiosity and problem-solving skills—qualities essential for today's workforce.",
    stars: 5,
  },
  {
    testimonial: {
      name: "Roshan A",
      about: "Instructor",
      img: "https://tenthhousestudio.com/wp-content/uploads/2024/06/Image-6-1-684x1024.jpg",
      role: 1,
    },
    msg: "Academix is incredibly user-friendly and caters to a diverse audience. The multilingual support and accessibility features make it an inclusive platform for students across different backgrounds. It's a step forward in democratizing education.",
    stars: 4,
  },
  {
    testimonial: {
      name: "Meg Han",
      about: "Student",
      img: "https://i.pinimg.com/736x/c6/ff/e7/c6ffe723640268f134b2de12a70bdcf1.jpg",
      role: 0,
    },
    msg: "Academix isn't just for students—it's a platform that encourages lifelong learning. The curated content and advanced AI recommendations keep me updated in my field of study. I highly recommend it to anyone looking to stay ahead in their career",
    stars: 5,
  },
];

export default function Testimonials() {
  const plugin = React.useRef(Autoplay({ stopOnInteraction: true }));

  return (
    <Section className="hidden md:block">
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
                  msg={ele.msg}
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
