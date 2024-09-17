import { Star } from "lucide-react";

export default function StarIcon({ glow, ...props }) {
  return <Star {...(glow && { fill: "#ff0" })} {...props} />;
}
