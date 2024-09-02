import { LucideProps, Star } from "lucide-react";

export default function StarIcon({
  glow,
  ...props
}: { glow?: boolean } & LucideProps) {
  return <Star {...(glow && { fill: "#ff0" })} {...props} />;
}
