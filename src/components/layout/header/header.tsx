"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  bordered?: boolean;
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, sticky = true, bordered = true, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "w-full h-14 flex items-center px-4 bg-[var(--color-elevated)]/80 backdrop-blur-md",
        "z-[var(--z-sticky)]",
        sticky && "sticky top-0",
        bordered && "border-b border-[var(--color-border)]",
        className
      )}
      {...props}
    />
  )
);

Header.displayName = "Header";
