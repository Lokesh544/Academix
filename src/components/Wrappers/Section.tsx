import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Section({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("my-16", className)}>{children}</section>;
}
