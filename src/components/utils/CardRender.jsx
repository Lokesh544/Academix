import { cn } from "@/lib/utils";
import { TypographyH3 } from "../ui/typography";

/**
 *
 * @param {{data: object, ItemRender: React.JSXElementConstructor, children?: React.JSX.Element | string, className?: string | object, placeholder: string | React.JSX.Element, props}} props
 * @returns
 */
export default function CardRender({
  children,
  className,
  data,
  ItemRender,
  placeholder = "No Item Found",
  ...props
}) {
  return (
    <div
      className={cn(
        "flex justify-around flex-wrap gap-x-4 gap-y-6 my-8",
        className
      )}
      {...props}
    >
      {children}
      {typeof data != "undefined" && data.length > 0 ? (
        data.map((ele, id) => <ItemRender key={id} id={id} {...ele} />)
      ) : typeof placeholder == "object" ? (
        placeholder
      ) : (
        <TypographyH3>{placeholder}</TypographyH3>
      )}
    </div>
  );
}
