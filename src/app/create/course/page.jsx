import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import CreateCourseForm from "@/views/course/CreateCourseForm";

export default function Page() {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <CreateCourseForm />
      <Footer />
    </main>
  );
}
