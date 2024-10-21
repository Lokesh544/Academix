import { cn } from "@/lib/utils";

/**
 *
 * @param {{className?: string | object, children?: string}} props
 * @returns
 */
export function TypographyH1({ className, children, ...props }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

/**
 *
 * @param {{className?: string | object, children?: string}} props
 * @returns
 */
export function TypographyH2({ className, children, ...props }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

/**
 *
 * @param {{className?: string | object, children?: string}} props
 * @returns
 */
export function TypographyH3({ className, children, ...props }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

/**
 *
 * @param {{className?: string | object, children?: string}} props
 * @returns
 */
export function TypographyH4({ className, children, ...props }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

/**
 *
 * @param {{className?: string | object, children?: string}} props
 * @returns
 */
export function TypographyP({ className, children, ...props }) {
  return (
    <h1
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
