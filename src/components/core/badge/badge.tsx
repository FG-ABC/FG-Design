import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-[var(--radius-full)]",
    "px-2.5 py-0.5 text-xs font-medium",
    "transition-colors duration-[var(--duration-fast)]",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-base)] border border-[var(--color-border)]",
        accent: "bg-[var(--color-accent-100)] text-[var(--color-accent-700)]",
        success: "bg-[var(--color-success-surface)] text-[var(--color-success)]",
        warning: "bg-[var(--color-warning-surface)] text-[var(--color-warning)]",
        danger: "bg-[var(--color-danger-surface)] text-[var(--color-danger)]",
        info: "bg-[var(--color-info-surface)] text-[var(--color-info)]",
        outline: "border border-[var(--color-border)] text-[var(--color-subtle)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);

Badge.displayName = "Badge";

export { badgeVariants };
