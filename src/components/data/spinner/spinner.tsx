"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-[var(--radius-full)] border-2 border-[var(--color-overlay)] border-t-[var(--color-accent-500)]",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12 border-[3px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <div className={spinnerVariants({ size })} aria-hidden="true" />
      {label ? (
        <span className="text-xs text-[var(--color-subtle)]">{label}</span>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  )
);

Spinner.displayName = "Spinner";
