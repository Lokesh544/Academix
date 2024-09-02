import Image from "next/image";
import LogoBanner from "@/assets/image-Photoroom.png";

export default function Footer() {
  return (
    <div className="my-4 py-6 border-t-2 border-t-primary-foreground flex justify-around">
      <Image
        src={LogoBanner}
        alt="LogoBanner"
        className="rounded text-primary my-2 pb-2 bg-background-200 border h-24 w-auto"
      />
      <div>
        <p className="font-bold text-xl my-2">Location</p>
        <p>India</p>
      </div>
      <div>
        <p className="font-bold text-xl my-2">Get In Touch</p>
        <p>Email: academix@gmail.com</p>
        <p>Phone: 98xxx56xx3</p>
      </div>
    </div>
  );
}
