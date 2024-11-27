import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import Course from "@/views/course/Course";

export default function Page({ params }) {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-2 md:px-10">
      <NavBar />
      <Course id={params.id} />
      <Footer />
    </main>
  );
}
