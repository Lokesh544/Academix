import { cn } from "@/lib/utils";
import React from "react";

/**
 *
 * @param {{data: object, ItemRender: React.JSXElementConstructor, children?: React.JSX.Element | string, className?: string | object, props}} props
 * @returns
 */
export default function CardRender({
  children,
  className,
  data,
  ItemRender,
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
      {data.map((ele, id) => (
        <ItemRender key={id} id={id} {...ele} />
      ))}
    </div>
  );
}
