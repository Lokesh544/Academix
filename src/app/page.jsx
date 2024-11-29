import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import Courses from "@/views/home/sections/Courses";
import Features from "@/views/home/sections/Features";
import Hero from "@/views/home/sections/Hero";
import JoinUs from "@/views/home/sections/JoinUs";
import Testimonials from "@/views/home/sections/Testimonials";

export default function Page() {
  return (
    <main className="xl:max-w-screen-xl h-screen mx-auto px-4 md:px-10">
      <NavBar />
      <Hero />
      <Courses />
      <Features />
      <Testimonials />
      <JoinUs />
      <Footer />
    </main>
  );
}
