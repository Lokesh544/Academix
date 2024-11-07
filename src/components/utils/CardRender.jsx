import { cn } from "@/lib/utils";

/**
 *
 * @param {{data: object, ItemRender: React.JSXElementConstructor, children?: React.JSX.Element | string, className?: string | object, placeholder: string, props}} props
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
      {typeof data != "undefined"
        ? data.map((ele, id) => <ItemRender key={id} id={id} {...ele} />)
        : placeholder}
    </div>
  );
}
