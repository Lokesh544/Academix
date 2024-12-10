import { cn } from "@/lib/utils";

export default function Section({ className, children, ...props }) {
  return (
    <section className={cn("my-16", className)} {...props}>
      {children}
    </section>
  );
}
