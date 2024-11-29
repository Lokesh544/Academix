import { cn } from "@/lib/utils";
import React from "react";

/**
 *
 * @param {{data: object, ItemRender: React.JSXElementConstructor, children?: React.JSX.Element | string, className?: string | object, props, dividers?: boolean, Divider?: React.JSXElementConstructor}} props
 * @returns
 */
export default function ListRender({
  children,
  className,
  data,
  ItemRender,
  dividers = false,
  Divider = DefaultDivider,
  ...props
}) {
  return (
    <div
      className={cn("flex flex-col gap-x-4 gap-y-6 my-8", className)}
      {...props}
    >
      {children}
      {data.map((ele, id) => (
        <>
          <ItemRender key={id} id={id} {...ele} />
          {dividers && id < data.length - 1 && (
            <Divider key={data.length + id} />
          )}
        </>
      ))}
    </div>
  );
}

function DefaultDivider() {
  return <div className="border border-border/30" />;
}
