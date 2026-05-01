import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium text-sm leading-none whitespace-nowrap",
    "rounded-[var(--radius-md)]",
    "transition-all duration-[var(--duration-base)]",
    "cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-accent-500)] text-white",
          "shadow-[var(--shadow-sm)]",
          "hover:bg-[var(--color-accent-600)]",
          "active:bg-[var(--color-accent-700)] active:scale-[0.98]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-base)]",
          "hover:bg-[var(--color-overlay)]",
          "active:bg-[var(--color-border)]",
        ],
        outline: [
          "border border-[var(--color-border)]",
          "bg-white text-[var(--color-base)]",
          "shadow-[var(--shadow-xs)]",
          "hover:bg-[var(--color-surface)] hover:border-[var(--color-muted)]",
        ],
        danger: [
          "bg-[var(--color-danger-surface)] text-[var(--color-danger)]",
          "border border-[var(--color-danger)]/20",
          "hover:bg-[var(--color-danger)]/10",
        ],
        link: [
          "text-[var(--color-accent-500)] underline-offset-4",
          "hover:underline",
        ],
      },
      size: {
        sm: "h-[var(--height-input-sm)] px-3 text-xs rounded-[var(--radius-sm)]",
        md: "h-[var(--height-input)] px-4",
        lg: "h-[var(--height-input-lg)] px-6 text-base rounded-[var(--radius-lg)]",
        icon: "h-[var(--height-input)] w-[var(--height-input)] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
