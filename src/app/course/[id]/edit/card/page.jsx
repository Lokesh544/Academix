import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
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
