import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva("relative w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-overlay)]", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
  {
    variants: {
      color: {
        accent: "bg-[var(--color-accent-500)]",
        success: "bg-[var(--color-success)]",
        warning: "bg-[var(--color-warning)]",
        danger: "bg-[var(--color-danger)]",
      },
    },
    defaultVariants: {
      color: "accent",
    },
  }
);

type IndicatorColor = "accent" | "success" | "warning" | "danger";

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "color">,
    VariantProps<typeof progressVariants> {
  value?: number;
  color?: IndicatorColor;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, size, color, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(indicatorVariants({ color }), "rounded-[var(--radius-full)]")}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";
