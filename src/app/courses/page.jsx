import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import Courses from "@/views/courses/courses";

export default function Page({ searchParams }) {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <Courses search={searchParams.search} />
      <Footer />
    </main>
  );
}
