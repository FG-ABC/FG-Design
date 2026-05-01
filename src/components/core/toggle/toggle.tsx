import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  size?: "sm" | "md";
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, label, size = "md", id, ...props }, ref) => {
  const toggleId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        ref={ref}
        id={toggleId}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center",
          "rounded-[var(--radius-full)]",
          "border-2 border-transparent",
          "transition-colors duration-[var(--duration-base)]",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "bg-[var(--color-border)]",
          "data-[state=checked]:bg-[var(--color-accent-500)]",
          size === "sm" ? "h-4 w-7" : "h-5 w-9",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-[var(--radius-full)] bg-white",
            "shadow-[var(--shadow-sm)]",
            "transition-transform duration-[var(--duration-base)]",
            size === "sm"
              ? "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0"
              : "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={toggleId}
          className="text-sm text-[var(--color-base)] leading-none cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
});

Toggle.displayName = "Toggle";
