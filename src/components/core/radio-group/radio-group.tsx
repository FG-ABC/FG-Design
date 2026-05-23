"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export interface RadioGroupOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "children"
  > {
  options: RadioGroupOption[];
  orientation?: "horizontal" | "vertical";
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, options, orientation = "vertical", ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      "flex",
      orientation === "vertical" ? "flex-col gap-2.5" : "flex-row flex-wrap gap-4",
      className
    )}
    {...props}
  >
    {options.map((opt) => (
      <RadioGroupItem key={opt.value} option={opt} />
    ))}
  </RadioGroupPrimitive.Root>
));

RadioGroup.displayName = "RadioGroup";

function RadioGroupItem({ option }: { option: RadioGroupOption }) {
  const id = `radio-${option.value}`;
  return (
    <div className="flex items-start gap-2.5">
      <RadioGroupPrimitive.Item
        id={id}
        value={option.value}
        disabled={option.disabled}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded-full",
          "border border-[var(--color-border)] bg-[var(--color-field)]",
          "shadow-[var(--shadow-xs)]",
          "transition-all duration-[var(--duration-fast)]",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-[var(--color-accent-500)]",
          "data-[state=checked]:bg-[var(--color-field)]"
        )}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-[var(--color-accent-500)]" />
      </RadioGroupPrimitive.Item>
      <label
        htmlFor={id}
        className={cn(
          "flex flex-col gap-0.5 cursor-pointer",
          option.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className="text-sm text-[var(--color-base)] leading-none">
          {option.label}
        </span>
        {option.description && (
          <span className="text-xs text-[var(--color-ink)] leading-snug">
            {option.description}
          </span>
        )}
      </label>
    </div>
  );
}
