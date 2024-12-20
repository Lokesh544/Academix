import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import EditCourseForm from "@/views/course/EditCourseForm";

export default function Page({ params }) {
  return (
    <main className="max-w-screen-xl h-screen mx-auto px-4 md:px-10">
      <NavBar />
      <EditCourseForm id={params.id} />
      <Footer />
    </main>
  );
}
