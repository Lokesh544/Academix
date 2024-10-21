import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/Navbar/NavBar";
import EditCourseCardForm from "@/views/course/EditCourseCardForm";

export default function Page() {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-10">
      <NavBar />
      <EditCourseCardForm />
      <Footer />
    </main>
  );
}
