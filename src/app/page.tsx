import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import Courses from "@/views/home/sections/Courses";
import Features from "@/views/home/sections/Features";
import Hero from "@/views/home/sections/Hero";
import JoinUs from "@/views/home/sections/JoinUs";
import Testimonials from "@/views/home/sections/Testimonials";

export default function Page() {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
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
