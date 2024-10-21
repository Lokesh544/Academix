import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import EditCourseForm from "@/views/course/EditCourseForm";

export default function Page() {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <EditCourseForm />
      <Footer />
    </main>
  );
}
