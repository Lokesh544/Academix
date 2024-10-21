import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import Course from "@/views/course/Course";

export default function Page({ params }) {
  console.log(params);
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <Course />
      <Footer />
    </main>
  );
}
