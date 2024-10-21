import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import Courses from "@/views/courses/courses";

export default function Page({ searchParams }) {
  console.log(searchParams);

  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <Courses />
      <Footer />
    </main>
  );
}
