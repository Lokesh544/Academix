import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import CourseForm from "@/views/courseForm/CourseForm";

export default function Page() {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <CourseForm />
      <Footer />
    </main>
  );
}
