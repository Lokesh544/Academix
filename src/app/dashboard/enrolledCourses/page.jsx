import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import CheckLogin from "@/lib/utils/user/checkLogin";
import EnrolledCourses from "@/views/dashboard/EnrolledCourses";

export default function Page({ searchParams }) {
  return (
    <main className="xl:max-w-screen-xl h-screen mx-auto px-4 md:px-10">
      <CheckLogin />
      <NavBar />
      <EnrolledCourses search={searchParams.search} />
      <Footer />
    </main>
  );
}
