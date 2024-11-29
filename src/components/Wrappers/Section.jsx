import { cn } from "@/lib/utils";

export default function Section({ className, children }) {
  return <section className={cn("my-16", className)}>{children}</section>;
}
