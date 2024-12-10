import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import CheckLogin from "@/lib/utils/user/checkLogin";
import CreatedCourses from "@/views/dashboard/sections/CreatedCourses";
import EnrolledCourses from "@/views/dashboard/sections/EnrolledCourses";

export default function Page() {
  return (
    <main className="xl:max-w-screen-xl h-screen mx-auto px-4 md:px-10">
      <CheckLogin />
      <NavBar />
      <div className="min-h-[calc(100vh-20rem)]">
        <EnrolledCourses />
        <CreatedCourses />
      </div>
      <Footer />
    </main>
  );
}
