"use client";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export interface DividerProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: string;
}

export const Divider = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(({ className, orientation = "horizontal", label, ...props }, ref) => {
  if (label && orientation === "horizontal") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <SeparatorPrimitive.Root
          ref={ref}
          orientation="horizontal"
          className="flex-1 h-px bg-[var(--color-border)]"
          {...props}
        />
        <span className="text-xs text-[var(--color-subtle)] whitespace-nowrap">{label}</span>
        <SeparatorPrimitive.Root
          orientation="horizontal"
          className="flex-1 h-px bg-[var(--color-border)]"
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        "bg-[var(--color-border)] shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
});

Divider.displayName = "Divider";
