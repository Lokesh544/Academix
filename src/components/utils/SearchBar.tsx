import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { ReactNode } from "react";

export interface SearchBarProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}
export interface SearchBarInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface SearchBarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        className={cn("flex items-center space-x-2 p-2", className)}
        {...props}
      >
        <SearchBarInput ref={ref} />
        <SearchBarButton />
      </form>
    );
  }
);
export default SearchBar;

export const SearchBarInput = React.forwardRef<
  HTMLInputElement,
  SearchBarInputProps
>(({ className, type = "text", ...props }, ref) => {
  return (
    <Input
      className={cn(
        "bg-foreground font-bold lg:text-lg text-primary-foreground rounded-lg",
        className
      )}
      ref={ref}
      type={type}
      {...props}
    />
  );
});

export function SearchBarButton({
  className,
  label = "Search",
  type = "submit",
  ...props
}: SearchBarButtonProps) {
  return (
    <Button
      className={cn(
        "rounded-lg bg-secondary-200 text-primary hover:bg-secondary-200/90",
        className
      )}
      type={type}
      {...props}
    >
      {label}
    </Button>
  );
}
