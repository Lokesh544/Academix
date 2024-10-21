import { Star } from "lucide-react";
/**
 *
 * @param {{glow: boolean}} props
 * @returns
 */
export default function StarIcon({ glow, ...props }) {
  return <Star {...(glow && { fill: "#ff0" })} {...props} />;
}
